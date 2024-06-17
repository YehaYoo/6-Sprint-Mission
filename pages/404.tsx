import Link from "next/link";
import Image from "next/image";
import styles from "../styles/404.module.css";

const Custom404Page = () => {
  return (
    <section className={styles.notFoundWrapper}>
      <div className={styles.notFoundContainer}>
        <Image
          width={350}
          height={350}
          alt="not found"
          src="/images/notFound.svg"
        />
        <div className={styles.notFoundLinkItems}>
          <Link className={styles.notFoundLink} href="/">
            <p className={styles.notFoundLinkText}>홈페이지로 돌아가기</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Custom404Page;
