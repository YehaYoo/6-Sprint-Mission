import React from "react";
import AllArticlesSection from "../components/AllArticlesSection";
import BestArticlesSection from "../components/BestArticlesSection";
import styles from "../styles/boards.module.css";
import { getArticles } from "../lib/api";
import { ArticleListProps as AllArticleListProps } from "../components/Articles";

interface BoardsProps {
  initialAllArticles: AllArticleListProps[];
}

export default function Boards({ initialAllArticles }: BoardsProps) {
  return (
    <div className={styles.articleSectionWrapper}>
      <section className={styles.articleSection}>
        <BestArticlesSection />
        <section>
          <AllArticlesSection initialAllArticles={initialAllArticles} />
        </section>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const allArticlesLimit = 10;

  const initialAllArticles = await getArticles({
    limit: allArticlesLimit,
    order: "recent",
  });

  return {
    props: {
      initialAllArticles,
    },
  };
}
