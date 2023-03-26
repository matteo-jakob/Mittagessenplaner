const loginFormBox = document.querySelector('.form-box');
  const registerFormBox = document.querySelector('#register-form-box');

  const loginLink = document.querySelector('#login-link');
  const registerLink = document.querySelector('#register-link');

  registerLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginFormBox.style.display = 'none';
    registerFormBox.style.display = 'block';
  });

  loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    registerFormBox.style.display = 'none';
    loginFormBox.style.display = 'block';
  });