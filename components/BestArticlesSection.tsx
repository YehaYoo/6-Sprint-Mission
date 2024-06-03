import Link from "next/link";
import React from "react";
import styles from "./BestArticlesSection.module.css";
import Image from "next/image";
import formatDate from "../utils/formatData";

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

function BestArticlesCard({
  id,
  title,
  image,
  likeCount,
  writer,
  createdAt,
}: ArticleListProps) {
  const formattedDate = formatDate(createdAt);
  return (
    <Link className={styles.Link} href={`/items/${id}`}>
      <section className={styles.bestArticlesCard}>
        <Image
          src="/images/imgBadge.svg"
          alt="best badge"
          width={102}
          height={30}
        />
        <div className={styles.bestArticlesCardTopItems}>
          <p className={styles.bestcardTitle}>{title}</p>
          {image && (
            <div className={styles.bestcardimageWrapper}>
              <Image
                width={72}
                height={72}
                className={styles.bestcardimage}
                src={image}
                alt="best article image"
              />
            </div>
          )}
        </div>
        <div className={styles.bestArticlesCardBottomItems}>
          <div className={styles.bestArticlesCardBottomItem}>
            <p className={styles.bestCardNickname}> {writer.nickname}</p>
            <Image
              src="/images/favoriteIcon.svg"
              width={16}
              height={16}
              alt="favorite icon"
            />
            <p className={styles.bestCardLikeCount}>{likeCount}</p>
          </div>
          <p className={styles.bestCardCreatedAt}> {formattedDate} </p>
        </div>
      </section>
    </Link>
  );
}

interface ArticlesProps {
  articles: ArticleListProps[];
}

function BestArticlesSection({ articles }: ArticlesProps) {
  return (
    <ul className={styles.bestArticles}>
      {articles.map((article) => (
        <li key={article.id}>
          <BestArticlesCard {...article} />
        </li>
      ))}
    </ul>
  );
}

export default BestArticlesSection;
