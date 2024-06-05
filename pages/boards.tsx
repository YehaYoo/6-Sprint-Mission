import React from "react";
import AllArticlesSection from "../components/AllArticlesSection";
import BestArticlesSection from "../components/BestArticlesSection";
import styles from "../styles/boards.module.css";

export default function Boards() {
  return (
    <div className={styles.articleSectionWrapper}>
      <section className={styles.articleSection}>
        <BestArticlesSection />

        <section>
          <AllArticlesSection />
        </section>
      </section>
    </div>
  );
}
