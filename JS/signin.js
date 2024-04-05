const inputItems = document.querySelector('.input-items');
const email = document.querySelector('.email');
const password = document.querySelector('#password');
const emailError = document.querySelector('.email-error');
const emptyEmail = document.querySelector('.empty-email');
const emptyPassword = document.querySelector('.empty-password');
const passwordError = document.querySelector('.password-error');
const signinButton = document.querySelector('.signin-button');

inputItems.addEventListener('focusout', function(e) {
  if (e.target.classList.contains('input-item')) {
      if (e.target.value.trim() === '') {
          e.target.classList.add('markInput');
      } else {
          e.target.classList.remove('markInput');
      }
   }
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener('focusout', function() {
      if(email.value.trim() === '') {
        emptyEmail.style.display = 'block';
        emailError.style.display = 'none';
      } else if(!emailPattern.test(email.value.trim())) {
        emptyEmail.style.display = 'none';
        emailError.style.display = 'block';
      }
        else { 
          emptyEmail.style.display = 'none';
          emailError.style.display = 'none';
        }
});


password.addEventListener('focusout', function() {
  if(password.value.trim() === '') {
    emptyPassword.style.display = 'block';
  }  else if(password.value.trim().length < 8) {
      emptyPassword.style.display = 'none';
      passwordError.style.display = 'block';
  }  else {
      emptyPassword.style.display = 'none';
      passwordError.style.display = 'none';
      signinButton.style.pointerEvents = 'auto';
    }
});

const visibilityToggle = document.querySelector('.visibility');
const eyeIcon = document.querySelector('.eye-icon');

function togglePasswordVisibility() {
  if (password.type === 'password') {
    password.type = 'text';
    eyeIcon.src = '/assets/btn_visibility.png';
  } else {
    password.type = 'password';
    eyeIcon.src = '/assets/btn_unvisibility.png'; 
  }
}

visibilityToggle.addEventListener('click', togglePasswordVisibility);