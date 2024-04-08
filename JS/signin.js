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

//비밀번호 에러
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


//인풋 요소 조건 충족시까지 로그인 버튼 비활성화
const signinButton = document.querySelector('.signin-button');

function checkValidity() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

return emailValue !== '' && passwordValue !== '' && password.value.trim().length >= 8;
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
