// 인풋 요소 비었을 때 테두리 설정
const inputItems = document.querySelector('.input-items');
inputItems.addEventListener('focusout', function(e) {
  if (e.target.classList.contains('input-item')) {
      if (e.target.value.trim() === '') {
          e.target.classList.add('markInput');
      } else {
          e.target.classList.remove('markInput');
      }
   }
});

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

// 닉네임 에러 메세지
const Nickname = document.querySelector('#nickname-input');
const emtyNickname = document.querySelector('.empty-nickname');
Nickname.addEventListener('focusout', function() {
  if(Nickname.value.trim() === '') {
    emtyNickname.style.display = 'block';
  } else { 
    emtyNickname.style.display = 'none';
    }
});

// 비밀번호 에러 메세지
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

// 비밀번호 확인 에러 메세지
const passwordCheck = document.querySelector('#password-check');
const passwordCheckError = document.querySelector('.passwordcheck-error');
passwordCheck.addEventListener('focusout', function() {
  if(passwordCheck.value !== password.value) {
    passwordCheckError.style.display = 'block';
  } else { 
    passwordCheckError.style.display = 'none';
    signinButton.style.pointerEvents = 'auto';
    }
});

const signinButton = document.querySelector('.signin-button');

//visibility 버튼 조작 
const passwordInputs = Array.from(document.querySelectorAll('.password-input'));
const visibilityButtons = Array.from(document.querySelectorAll('.visibility'));
const eyeIcons = Array.from(document.querySelectorAll('.eye-icon'));

visibilityButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    togglePasswordVisibility(index);
  });
});

function togglePasswordVisibility(index) {
  const input = passwordInputs[index];
  const eyeIcon = eyeIcons[index];

  input.type = input.type === 'password' ? 'text' : 'password';
  eyeIcon.src = input.type === 'password' ? '/assets/btn_unvisibility.png' : '/assets/btn_visibility.png';
}

