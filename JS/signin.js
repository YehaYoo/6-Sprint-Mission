
// 인풋 요소 비었을 때 테두리 설정
function handleInputItemFocusOut(e) {
  if (e.target.classList.contains('input-item')) {
      if (e.target.value.trim() === '') {
          e.target.classList.add('markInput');
      } else {
          e.target.classList.remove('markInput');
      }
  }
}
const inputItems = document.querySelector('.input-items');
inputItems.addEventListener('focusout', handleInputItemFocusOut);

// 이메일 에러 메세지
const email = document.querySelector('.email');
const emailError = document.querySelector('.email-error');
const emptyEmail = document.querySelector('.empty-email');
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

//비밀번호 에러 메세지
const password = document.querySelector('#password');
const emptyPassword = document.querySelector('.empty-password');
const passwordError = document.querySelector('.password-error');

password.addEventListener('focusout', function() {
  if(password.value.trim() === '') {
    emptyPassword.style.display = 'block';
    passwordError.style.display = 'none';
  }  else if(password.value.trim().length < 8) {
      emptyPassword.style.display = 'none';
      passwordError.style.display = 'block';
  }  else {
      emptyPassword.style.display = 'none';
      passwordError.style.display = 'none';
    }
});

//인풋 요소 조건 충족시까지 로그인 버튼 비활성화
const signinButton = document.querySelector('.signin-button');

function checkValidity() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

return emailValue !== '' && passwordValue !== '' && password.value.trim().length >= 8;
};

function updateSigninButton() {
  signinButton.style.pointerEvents = checkValidity() ? "auto" : "none";
}

email.addEventListener('focusout', updateSigninButton);
password.addEventListener('focusout', updateSigninButton);

//visibility 버튼 조작 
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