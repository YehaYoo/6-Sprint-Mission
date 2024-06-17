import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/HomePage.module.css";

function Homepage() {
  return (
    <section>
      <main className={styles.withHeader}>
        <section className={styles.topBanner}>
          <div>
            <h1 className={styles.topBannerDescription}>
              일상의 모든 물건을&nbsp;
              <br />
              거래해 보세요
            </h1>
            <Link href="/items" className={styles.pillButton}>
              구경하러 가기
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.feature}>
            <Image
              width={588}
              height={444}
              src="/images/hotItem.svg"
              alt="인기 상품"
            />
            <div className={styles.featureContent}>
              <h2 className={styles.featureSubtitle}>Hot item</h2>
              <h1 className={styles.featureTitle}>
                인기 상품을{" "}
                <span className={styles.breakOnDesktop}>
                  <br />
                </span>
                확인해 보세요
              </h1>
              <p className={styles.featureDescription}>
                가장 HOT한 중고거래 물품을
                <br />
                판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>
          <div className={styles.feature}>
            <Image
              width={588}
              height={444}
              src="/images/searchItem.svg"
              alt="검색 기능"
            />
            <div className={styles.featureContent}>
              <h2 className={styles.featureSubtitle}>Search</h2>
              <h1 className={styles.featureTitle}>
                구매를 원하는
                <span className={styles.breakOnDesktop}>
                  <br />
                </span>
                상품을 검색하세요
              </h1>
              <p className={styles.searchDescription}>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
          <div className={styles.feature}>
            <Image
              width={588}
              height={444}
              src="/images/registerItem.svg"
              alt="판매 상품 등록"
            />
            <div className={styles.featureContent}>
              <h2 className={styles.featureSubtitle}>Register</h2>
              <h1 className={styles.featureTitle}>
                판매를 원하는{" "}
                <span className={styles.breakOnDesktop}>
                  <br />
                </span>
                상품을 등록하세요
              </h1>
              <p className={styles.featureDescription}>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.bottomBanner}>
            <h1 className={styles.bottomBannerDescription}>
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h1>
          </div>
        </section>
      </main>

      <footer className={styles.footerSection}>
        <div id={styles.copyright}>©codeit - 2024</div>
        <div id={styles.footerMenu}>
          <a href="privacy.html">Privacy Policy</a>
          <a href="faq.html">FAQ</a>
        </div>
        <div id={styles.socialMedia}>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 페이스북"
          >
            <Image
              width={20}
              height={20}
              src="/images/icFacebook.svg"
              alt="페이스북"
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 트위터"
          >
            <Image
              width={20}
              height={20}
              src="/images/icTwitter.svg"
              alt="트위터"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 유튜브"
          >
            <Image
              width={20}
              height={20}
              src="/images/icYoutube.svg"
              alt="유튜브"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="판다마켓 인스타그램"
          >
            <Image
              width={20}
              height={20}
              src="/images/icInstagram.svg"
              alt="인스타그램"
            />
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Homepage;
