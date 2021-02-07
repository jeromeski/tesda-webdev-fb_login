var username = document.querySelector('input[type="text"]');
username.addEventListener('focus', function () {
  login.handleClearWarnings();
});
var login = {
  authUname: 'admin',
  authPword: 'password',
  url: 'https://jeromeski.github.io/tesda-webdev-fb_posts/',
  counter: 3,
  limit: 0,
  success: 'Login Success! Redirecting...',
  failed: 'Wrong username or password! ',
  handleClearWarnings: function () {
    document.querySelector('.login__status').innerHTML = '&nbsp;';
  },
  handleAuth: function (url = this.url) {
    var un = document.querySelector('#uname').value.toLowerCase();
    var pw = document.querySelector('#pword').value;
    var loginEl = document.querySelector('.login__status');
    loginEl.style.color = '#5abf52';

    if (un === this.authUname && pw === this.authPword) {
      var timeleft = 5;
      var countdownTimer = setInterval(function () {
        loginEl.innerHTML =
          '<b></b>Login Success! Redirecting in</b> ' +
          timeleft +
          ' <b>seconds</b>';
        timeleft -= 1;
        if (timeleft < 0) {
          clearInterval(countdownTimer);
          window.location.replace(url);
        }
      }, 2000);
    } else {
      this.counter--;
      this.handleFailed();
    }
  },
  handleFailed: function () {
    var loginErrEl1 = document.querySelector('.login__status');
    if (this.counter === this.limit) {
      loginErrEl1.style.color = '#d9534f';
      this.handleTimeOut();
    } else {
      console.log(this.counter);
      if (this.counter === 1) {
        loginErrEl1.classList.add('success');
        loginErrEl1.innerHTML =
          this.failed + ' You have ' + this.counter + ' try left.';
      } else {
        loginErrEl1.classList.add('error');
        loginErrEl1.innerHTML =
          this.failed + 'You have  ' + this.counter + ' tries left.';
      }
    }
  },
  handleTimeOut: function () {
    var loginErrEl2 = document.querySelector('.login__status');
    loginErrEl2.style.color = '#d9534f';
    document.querySelector('#uname').disabled = true;
    document.querySelector('#pword').disabled = true;
    document.querySelector('#btn-submit').disabled = true;
    document.querySelector('#btn-submit').classList.add('disabled');
    var timeleft = 5;
    var downloadTimer = setInterval(function () {
      loginErrEl2.innerHTML =
        'Invalid login attempts detected!  Lockout ends in ' +
        timeleft +
        ' seconds';
      timeleft -= 1;
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        loginErrEl2.innerHTML = '';
        var el3 = document.querySelector('.login__reload');
        el3.innerHTML = 'Clear lockout <u>here</u>.';
      }
    }, 1000);
  },
  handleEnableInputs: function () {
    location.reload();
  },
};
