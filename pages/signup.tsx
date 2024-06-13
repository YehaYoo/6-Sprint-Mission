import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/loginPage.module.css";

function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [passwordCheckError, setPasswordCheckError] = useState<string>("");
  const [isSigninButtonDisabled, setIsSigninButtonDisabled] =
    useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_PASSWORD_LENGTH = 8;

  const validateEmail = () => {
    if (email.trim() === "") {
      setEmailError("이메일을 입력해주세요");
      return false;
    } else if (!emailPattern.test(email.trim())) {
      setEmailError("잘못된 이메일입니다");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요");
      return false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateNickname = () => {
    if (nickname.trim() === "") {
      setNicknameError("닉네임을 입력해주세요");
      return false;
    } else {
      setNicknameError("");
      return true;
    }
  };

  const validatePasswordCheck = () => {
    if (passwordCheck.trim() === "") {
      setPasswordCheckError("비밀번호를 다시 한 번 입력해주세요");
      return false;
    } else if (passwordCheck !== password) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      setPasswordCheckError("");
      return true;
    }
  };

  const updateSigninButton = () => {
    const isValid =
      validateEmail() &&
      validatePassword() &&
      validateNickname() &&
      validatePasswordCheck();
    setIsSigninButtonDisabled(!isValid);
  };

  useEffect(() => {
    updateSigninButton();
  }, [email, password, nickname, passwordCheck]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/signin");
  };

  const eyeIconSrc = isPasswordVisible
    ? "/images/btnVisibilityOn.svg"
    : "/images/btnVisibilityOff.svg";

  return (
    <section className={styles.signinWrapper}>
      <div className={styles.signupBox}>
        <header>
          <Link className={styles.logo} href="/">
            <Image
              width={396}
              height={132}
              alt="logo"
              src="/images/signinLogo.svg"
            />{" "}
          </Link>
        </header>
        <form className={styles.signinInputItems} onSubmit={handleSubmit}>
          <label className={styles.signinLabel} htmlFor="emailInput">
            이메일
          </label>
          <input
            id={styles.emailInput}
            className={`${styles.inputItem} ${
              emailError ? styles.markInput : ""
            }`}
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
          />
          {emailError && <p className={styles.emailError}>{emailError}</p>}

          <label htmlFor="nicknameInput" className={styles.signinLabel}>
            닉네임
          </label>
          <input
            id={styles.nicknameInput}
            className={`${styles.inputItem} ${
              nicknameError ? styles.markInput : ""
            }`}
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={validateNickname}
          />
          {nicknameError && (
            <p className={styles.nicknameError}>{nicknameError}</p>
          )}

          <label htmlFor="password" className={styles.signinLabel}>
            비밀번호
          </label>
          <div className={styles.passwordBox}>
            <input
              id={styles.password}
              className={`${styles.passwordInput} ${styles.inputItem} ${
                passwordError ? styles.markInput : ""
              }`}
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            {passwordError && (
              <p className={styles.passwordError}>{passwordError}</p>
            )}

            <button
              type="button"
              className={styles.visibility}
              onClick={togglePasswordVisibility}
            >
              <Image
                width={24}
                height={24}
                className={styles.eyeIcon}
                alt="visibility"
                src={eyeIconSrc}
              />
            </button>
          </div>

          <label htmlFor="passwordCheck" className={styles.signinLabel}>
            비밀번호 확인
          </label>
          <div className={styles.passwordBox}>
            <input
              id={styles.passwordCheck}
              className={`${styles.passwordInput} ${styles.inputItem} ${
                passwordCheckError ? styles.markInput : ""
              }`}
              name="passwordCheck"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
              onBlur={validatePasswordCheck}
            />
            {passwordCheckError && (
              <p className={styles.passwordcheckError}>{passwordCheckError}</p>
            )}
            <button
              type="button"
              className={styles.visibility}
              onClick={togglePasswordVisibility}
            >
              <Image
                width={24}
                height={24}
                className={styles.eyeIcon}
                alt="visibility"
                src={eyeIconSrc}
              />
            </button>
          </div>
          <button
            className={`${styles.signinButton} ${
              isSigninButtonDisabled ? "" : styles.active
            }`}
            type="submit"
            disabled={isSigninButtonDisabled}
          >
            회원가입
          </button>

          <div className={styles.snsSignin}>
            <div>간편 로그인하기</div>
            <div className={styles.sns}>
              <a href="https://www.google.com/">
                <Image
                  width={42}
                  height={42}
                  alt="google"
                  src="/images/googleIcon.svg"
                />{" "}
              </a>
              <a href="https://www.kakaocorp.com/">
                <Image
                  width={42}
                  height={42}
                  alt="kakao"
                  src="/images/kakaoIcon.svg"
                />{" "}
              </a>
            </div>
          </div>
          <div className={styles.btm}>
            이미 회원이신가요?
            <a href="signin">로그인</a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignupPage;
