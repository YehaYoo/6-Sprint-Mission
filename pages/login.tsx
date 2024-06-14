import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "@/lib/api";
import Image from "next/image";
import styles from "../styles/loginPage.module.css";

function SigninPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isSigninButtonDisabled, setIsSigninButtonDisabled] =
    useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_PASSWORD_LENGTH = 8;

  const validateEmail = (email: string) => {
    if (email.trim() === "") {
      setEmailError("이메일을 입력해주세요");
    } else if (!emailPattern.test(email.trim())) {
      setEmailError("잘못된 이메일 입니다");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    if (password.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요");
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요");
    } else {
      setPasswordError("");
    }
  };

  const updateSigninButton = () => {
    if (
      email.trim() !== "" &&
      password.trim() !== "" &&
      password.length >= MIN_PASSWORD_LENGTH
    ) {
      setIsSigninButtonDisabled(false);
    } else {
      setIsSigninButtonDisabled(true);
    }
  };

  useEffect(() => {
    updateSigninButton();
  }, [email, password]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await signIn({ email, password });
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/");
    } catch (error) {
      console.error("Failed to sign in:", error);
      alert("로그인에 실패했습니다.");
    }
  };
  const eyeIconSrc = isPasswordVisible
    ? "/images/btnVisibilityOn.svg"
    : "/images/btnVisibilityOff.svg";

  return (
    <section className={styles.signinWrapper}>
      <div className={styles.signinBox}>
        <header>
          <a className={styles.logo} href="/">
            <Image
              width={396}
              height={132}
              alt="logo"
              src="/images/signinLogo.svg"
            />
          </a>
        </header>
        <form className={styles.signinInputItems} onSubmit={handleSubmit}>
          <label className={styles.signinLabel} htmlFor="email-input">
            로그인
          </label>
          <input
            className={`${styles.inputItem} ${
              emailError ? styles.markInput : ""
            }`}
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            id="email-input"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
          />
          {emailError && <p className={styles.emailError}>{emailError}</p>}

          <label className={styles.signinLabel} htmlFor="password">
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
              onBlur={() => validatePassword(password)}
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
          <button
            className={`${styles.signinButton} ${
              isSigninButtonDisabled ? "" : styles.active
            }`}
            type="submit"
            disabled={isSigninButtonDisabled}
          >
            로그인
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
                />
              </a>
              <a href="https://www.kakaocorp.com/">
                <Image
                  width={42}
                  height={42}
                  alt="kakao"
                  src="/images/kakaoIcon.svg"
                />
              </a>
            </div>
          </div>
          <div className={styles.btm}>
            판다마켓이 처음이신가요?
            <a href="signup">회원가입</a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SigninPage;
