import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signUp } from "@/lib/api";
import Image from "next/image";
import styles from "../styles/loginPage.module.css";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const password = watch("password");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data: any) => {
    try {
      await signUp(data);
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign up:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const eyeIconSrc = isPasswordVisible
    ? "/images/btnVisibilityOn.svg"
    : "/images/btnVisibilityOff.svg";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, []);

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
        <form
          className={styles.signinInputItems}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={styles.signinLabel} htmlFor="emailInput">
            이메일
          </label>
          <input
            id={styles.emailInput}
            className={`${styles.inputItem} ${
              errors.email ? styles.markInput : ""
            }`}
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "잘못된 이메일입니다",
              },
            })}
            type="text"
            placeholder="이메일을 입력해주세요"
            autoFocus
          />
          {errors.email && typeof errors.email.message === "string" && (
            <p className={styles.emailError}>{errors.email.message}</p>
          )}

          <label htmlFor="nicknameInput" className={styles.signinLabel}>
            닉네임
          </label>
          <input
            id={styles.nicknameInput}
            className={`${styles.inputItem} ${
              errors.nickname ? styles.markInput : ""
            }`}
            {...register("nickname", {
              required: "닉네임을 입력해주세요",
            })}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          {errors.nickname && typeof errors.nickname.message === "string" && (
            <p className={styles.nicknameError}>{errors.nickname.message}</p>
          )}

          <label htmlFor="password" className={styles.signinLabel}>
            비밀번호
          </label>
          <div className={styles.passwordBox}>
            <input
              id={styles.password}
              className={`${styles.passwordInput} ${styles.inputItem} ${
                errors.password ? styles.markInput : ""
              }`}
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
              })}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.password && typeof errors.password.message === "string" && (
              <p className={styles.passwordError}>{errors.password.message}</p>
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
                errors.passwordCheck ? styles.markInput : ""
              }`}
              {...register("passwordCheck", {
                required: "비밀번호를 다시 한 번 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            {errors.passwordCheck &&
              typeof errors.passwordCheck.message === "string" && (
                <p className={styles.passwordcheckError}>
                  {errors.passwordCheck.message}
                </p>
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
              Object.keys(errors).length !== 0 ? "" : styles.active
            }`}
            type="submit"
            disabled={Object.keys(errors).length !== 0}
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
