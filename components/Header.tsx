import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Header.module.css";
import { useAuth } from "@/contexts/AuthProvider";

function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const isAddItemPage = router.pathname === "/additem";
  const isFreeBoardPage = router.pathname === "/items";

  if (isLoading) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navMenu}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.svg"
            className={styles.logoImg}
            width={153}
            height={51}
            alt="panda-market"
          />
        </Link>
        <Link
          href="/items"
          className={`${styles.navbarButton} ${
            isFreeBoardPage ? styles.activeLink : ""
          }`}
        >
          자유게시판
        </Link>
        <Link
          href="/additem"
          className={`${styles.navbarButton} ${
            isAddItemPage ? styles.activeLink : ""
          }`}
        >
          중고마켓
        </Link>
      </div>
      <div>
        {isAuthenticated ? (
          <button className={styles.profileButton}>
            <Image
              src="/images/profile.svg"
              alt="프로필 사진"
              width={40}
              height={40}
            />
          </button>
        ) : (
          <Link href="/login" className={styles.loginButton}>
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
