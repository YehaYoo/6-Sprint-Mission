import React from "react";
import Image from "next/image";
import formatDate from "@/utils/formatData";
import styles from "./CommentSection.module.css";

interface ProductInfoProps {
  article: {
    title: string;
    content: string;
    image: string | null;
    likeCount: number;
    createdAt: string;
    writer: {
      nickname: string;
    };
  };
}

function ArticleInfo({ article }: ProductInfoProps) {
  const { image, title, content, likeCount, createdAt, writer } = article;

  const formattedDate = formatDate(createdAt);

  return (
    <section className={styles.articleSectionItems}>
      <div className={styles.articleInfoTopItems}>
        <div className={styles.articleTitleSection}>
          <h1 className={styles.articleTitle}>{title}</h1>
          <button className={styles.commentKebab}>
            <Image
              src="/images/icKebab.svg"
              width={24}
              height={24}
              alt="kebab icon"
            />
          </button>
        </div>
        <div className={styles.articleAuthorSection}>
          <div className={styles.articleAuthor}>
            <Image
              src="/images/profile.svg"
              width={24}
              height={24}
              alt="profile"
            />
            <p className={styles.articleWriter}>{writer.nickname}</p>
            <p className={styles.articleCreatedAt}>{formattedDate}</p>
          </div>

          <div className={styles.favoriteCountSection}>
            <Image
              src="/images/favoriteIcon.svg"
              width={24}
              height={24}
              alt="favorite icon"
            />
            <p className={styles.favoriteCount}>{likeCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.articleContentSection}>
        {image && (
          <Image width={300} height={300} src={image} alt="article image" />
        )}
        <p className={styles.articleContent}>{content}</p>
      </div>
    </section>
  );
}

export default ArticleInfo;
