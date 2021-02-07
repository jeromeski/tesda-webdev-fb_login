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
  failed: 'Wrong username or password! ',
  handleClearWarnings: function () {
    document.querySelector('.login__status').innerHTML = '&nbsp;';
  },
  handleAuth: function (url = this.url) {
    var un = document.querySelector('#uname').value.toLowerCase();
    var pw = document.querySelector('#pword').value;
    if (un === this.authUname && pw === this.authPword) {
      var loginEl = document.querySelector('.login__status');
      loginEl.classList.remove('error');
      loginEl.classList.add('success');
      var timeleft = 3;
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
      }, 1000);
    } else {
      this.counter--;
      this.handleFailed();
    }
  },
  handleFailed: function () {
    var loginEl = document.querySelector('.login__status');
    loginEl.classList.add('error');
    if (this.counter === this.limit) {
      this.handleTimeOut();
    } else {
      console.log(this.counter);
      if (this.counter === 1) {
        loginEl.innerHTML =
          this.failed + ' You have ' + this.counter + ' try left.';
      } else {
        loginEl.innerHTML =
          this.failed + 'You have  ' + this.counter + ' tries left.';
      }
    }
  },
  handleTimeOut: function () {
    var loginEl = document.querySelector('.login__status');
    loginEl.classList.add('error');
    document.querySelector('#uname').disabled = true;
    document.querySelector('#pword').disabled = true;
    document.querySelector('#btn-submit').disabled = true;
    document.querySelector('#btn-submit').classList.add('disabled');
    var timeleft = 5;
    var downloadTimer = setInterval(function () {
      loginEl.innerHTML =
        'Invalid login attempts detected!  Lockout ends in ' +
        timeleft +
        ' seconds';
      timeleft -= 1;
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        loginEl.innerHTML = '';
        var el3 = document.querySelector('.login__reload');
        el3.innerHTML = 'Clear lockout <u>here</u>.';
      }
    }, 1000);
  },
  handleEnableInputs: function () {
    location.reload();
  },
};
