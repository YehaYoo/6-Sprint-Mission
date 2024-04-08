// 이메일 에러
const email = document.querySelector('.email');
const emailError = document.querySelector('.email-error');
const emptyEmail = document.querySelector('.empty-email');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener('focusout', function() {
  //1. 인풋이 비었을 때
  if(email.value.trim() === '') {
    emptyEmail.style.display = 'block';
    emailError.style.display = 'none';
    email.classList.add('markInput');
    return;
  }
  //2. 이메일 형식과 맞지 않을 때
  if(!emailPattern.test(email.value.trim())) {
    emptyEmail.style.display = 'none';
    emailError.style.display = 'block';
    email.classList.add('markInput');
    return;
  }
  //3. 조건을 모두 충족했을 때
  emptyEmail.style.display = 'none';
  emailError.style.display = 'none';
  email.classList.remove('markInput');
});

// 닉네임 에러
const nickName = document.querySelector('#nickname-input');
const emtyNickName = document.querySelector('.empty-nickname');
nickName.addEventListener('focusout', function() {
  //1. 인풋이 비었을 때
  if(nickName.value.trim() === '') {
    emtyNickName.style.display = 'block';
    nickName.classList.add('markInput');
    return;
  } 
  //2. 조건을 충족했을 때
  emtyNickName.style.display = 'none';
  nickName.classList.remove('markInput');
});

// 비밀번호 에러
const MIN_PASSWORD_LENGTH = 8;

const password = document.querySelector('#password');
const emptyPassword = document.querySelector('.empty-password');
const passwordError = document.querySelector('.password-error');

password.addEventListener('focusout', function() {
  //1. 인풋이 비었을 때
  if(password.value.trim() === '') {
    emptyPassword.style.display = 'block';
    passwordError.style.display = 'none';
    password.classList.add('markInput');
    return;
  } 
  //2. 글자 수가 MIN_PASSWORD_LENGTH 미만일 때
  if(password.value.trim().length < MIN_PASSWORD_LENGTH) {
      emptyPassword.style.display = 'none';
      passwordError.style.display = 'block';
      password.classList.add('markInput');
      return;
  }
  //3. 조건을 모두 충족했을 때
  emptyPassword.style.display = 'none';
  passwordError.style.display = 'none';
  password.classList.remove('markInput');
});

// 비밀번호 확인 에러
const passwordCheck = document.querySelector('#password-check');
const passwordCheckError = document.querySelector('.passwordcheck-error');
passwordCheck.addEventListener('focusout', function() {
  //1. password value와 일치하지 않을 때 
  if(passwordCheck.value !== password.value) {
    passwordCheckError.style.display = 'block';
    passwordCheck.classList.add('markInput');
    return;
  }
  //2. 조건을 모두 충족했을 때
  passwordCheckError.style.display = 'none';
  passwordCheck.classList.remove('markInput');
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
  if (checkValidity()) {
    signinButton.disabled = false; 
    signinButton.classList.add('active');
  }
  else {
    signinButton.disabled = true; 
    signinButton.classList.remove('active'); 
  }

}

email.addEventListener('focusout', updateSigninButton);
nickName.addEventListener('focusout', updateSigninButton);
password.addEventListener('focusout', updateSigninButton);
passwordCheck.addEventListener('focusout', updateSigninButton);

//visibility 버튼 조작 
const passwordBoxes = Array.from(document.querySelectorAll(".password-box"));

passwordBoxes.forEach(passwordBox => {
	const passwordInput = passwordBox.querySelector(".password-input");
	const visibilityButton = passwordBox.querySelector(".visibility");
	const eyeIcon = passwordBox.querySelector(".eye-icon");

	visibilityButton.addEventListener("click", () => {
		passwordInput.type =
			passwordInput.type === "password" ? "text" : "password";
		eyeIcon.src =
			passwordInput.type === "password"
				? "/assets/btn_unvisibility.png"
				: "/assets/btn_visibility.png";
	});
});
