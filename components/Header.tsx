import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Header.module.css";

interface UserStateButtonProps {
  isAddItemPage: boolean;
}

function UserStateButton({ isAddItemPage }: UserStateButtonProps) {
  return isAddItemPage ? (
    <button className={styles.profileButton}>
      <Image src="/images/profile.svg" alt="프로필 사진" />
    </button>
  ) : (
    <Link href="/signin">
      <button className={styles.loginButton}>로그인</button>
    </Link>
  );
}

function Navbar() {
  const router = useRouter();
  const isAddItemPage = router.pathname === "/additem";
  const isFreeBoardPage = router.pathname === "/items";
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
            isFreeBoardPage ? "styles.activeLink" : ""
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
        <UserStateButton isAddItemPage={isAddItemPage} />
      </div>
    </nav>
  );
}

export default Navbar;