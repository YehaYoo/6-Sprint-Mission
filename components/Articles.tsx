import Link from "next/link";
import React from "react";
import formatDate from "../utils/formatData";
import styles from "./Articles.module.css";
import Image from "next/image";

export interface ArticleListProps {
  id: number;
  title: string;
  price: number;
  likeCount: number;
  image: string;
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
}

function ArticleList({
  id,
  title,
  image,
  likeCount,
  writer,
  createdAt,
}: ArticleListProps) {
  const formattedDate = formatDate(createdAt);
  return (
    <Link className={styles.Link} href={`/addboard/${id}`}>
      <section className={styles.articlesList}>
        <div className={styles.articlesListTopItems}>
          <p className={styles.articlesListTitle}>{title}</p>
          {image && (
            <div className={styles.articleListImageWrapper}>
              <Image
                width={72}
                height={72}
                className={styles.articleListImage}
                src={image}
                alt="article image"
              />
            </div>
          )}
        </div>

        <div className={styles.articleListBottomItems}>
          <div className={styles.postInfo}>
            <Image
              src="/images/profile.svg"
              alt="프로필 사진"
              width={24}
              height={24}
            />
            <p className={styles.articleListNickname}> {writer.nickname}</p>
            <p className={styles.articleCreatedAt}> {formattedDate} </p>
          </div>
          <div className={styles.favoriteCountContainer}>
            <Image
              src="/images/favoriteIcon.svg"
              width={16}
              height={16}
              alt="favorite icon"
            />
            <p className={styles.articleLikeCount}>{likeCount}</p>
          </div>
        </div>
      </section>
    </Link>
  );
}

interface ArticlesProps {
  articles: ArticleListProps[];
}

function Articles({ articles }: ArticlesProps) {
  return (
    <ul className={styles.totalArticles}>
      {articles.map((article) => (
        <li className={styles.articles} key={article.id}>
          <ArticleList {...article} />
        </li>
      ))}
    </ul>
  );
}

export default Articles;
