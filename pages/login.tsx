import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "@/lib/api";
import Image from "next/image";
import styles from "../styles/loginPage.module.css";
import { useForm } from "react-hook-form";

function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data: any) => {
    try {
      const signInData = await signIn(data);
      localStorage.setItem("accessToken", signInData.accessToken);
      router.push("/");
    } catch (error) {
      console.error("Failed to sign in:", error);
      alert("로그인에 실패했습니다.");
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
        <form
          className={styles.signinInputItems}
          onSubmit={handleSubmit(onSubmit)}
        >
          {" "}
          <label className={styles.signinLabel} htmlFor="email-input">
            로그인
          </label>
          <input
            className={`${styles.inputItem} ${
              errors.email ? styles.markInput : ""
            }`}
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "잘못된 이메일 입니다",
              },
            })}
            type="text"
            placeholder="이메일을 입력해주세요"
            id="email-input"
            autoFocus
          />
          {errors.email && typeof errors.email.message === "string" && (
            <p className={styles.emailError}>{errors.email.message}</p>
          )}
          <label className={styles.signinLabel} htmlFor="password">
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
          <button
            className={`${styles.signinButton} ${
              Object.keys(errors).length !== 0 ? "" : styles.active
            }`}
            type="submit"
            disabled={Object.keys(errors).length !== 0}
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
