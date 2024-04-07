// 이메일 에러
const email = document.querySelector('.email');
const emailError = document.querySelector('.email-error');
const emptyEmail = document.querySelector('.empty-email');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener('focusout', function() {
      if(email.value.trim() === '') {
        emptyEmail.style.display = 'block';
        emailError.style.display = 'none';
        email.classList.add('markInput');
      } else if(!emailPattern.test(email.value.trim())) {
        emptyEmail.style.display = 'none';
        emailError.style.display = 'block';
        email.classList.add('markInput');
      }
        else { 
          emptyEmail.style.display = 'none';
          emailError.style.display = 'none';
          email.classList.remove('markInput');
        }
});

// 닉네임 에러
const nickName = document.querySelector('#nickname-input');
const emtyNickName = document.querySelector('.empty-nickname');
nickName.addEventListener('focusout', function() {
  if(nickName.value.trim() === '') {
    emtyNickName.style.display = 'block';
    nickName.classList.add('markInput');

  } else { 
    emtyNickName.style.display = 'none';
    nickName.classList.remove('markInput');
    }
});

// 비밀번호 에러
const password = document.querySelector('#password');
const emptyPassword = document.querySelector('.empty-password');
const passwordError = document.querySelector('.password-error');
password.addEventListener('focusout', function() {
  if(password.value.trim() === '') {
    emptyPassword.style.display = 'block';
    passwordError.style.display = 'none';
    password.classList.add('markInput');
  }  else if(password.value.trim().length < 8) {
      emptyPassword.style.display = 'none';
      passwordError.style.display = 'block';
      password.classList.add('markInput');
  }  else {
      emptyPassword.style.display = 'none';
      passwordError.style.display = 'none';
      password.classList.remove('markInput');
    }
});

// 비밀번호 확인 에러
const passwordCheck = document.querySelector('#password-check');
const passwordCheckError = document.querySelector('.passwordcheck-error');
passwordCheck.addEventListener('focusout', function() {
  if(passwordCheck.value !== password.value) {
    passwordCheckError.style.display = 'block';
    passwordCheck.classList.add('markInput');
  } else { 
    passwordCheckError.style.display = 'none';
    passwordCheck.classList.remove('markInput');
    }
});

//인풋 요소 조건 충족시까지 로그인 버튼 비활성화
const signinButton = document.querySelector('.signin-button');

function checkValidity() {
  const emailValue = email.value.trim();
  const nicknNameValue = nickName.value.trim();
  const passwordValue = password.value.trim();
  const passwordCheckValue = passwordCheck.value.trim();

return emailValue !== '' && nicknNameValue !== '' && passwordValue !== '' && passwordCheckValue !== '' && passwordCheckValue === passwordValue;
};

function updateSigninButton() {
  signinButton.style.pointerEvents = checkValidity() ? "auto" : "none";
}

email.addEventListener('focusout', updateSigninButton);
Nickname.addEventListener('focusout', updateSigninButton);
password.addEventListener('focusout', updateSigninButton);
passwordCheck.addEventListener('focusout', updateSigninButton);

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

