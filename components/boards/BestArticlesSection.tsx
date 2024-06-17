import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./BestArticlesSection.module.css";
import { getBestArticles } from "../../lib/api";
import Image from "next/image";
import formatDate from "../../utils/formatData";
import useResizeHandler from "../../utils/useResizeHandler";

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

function getBestArticlesLimit() {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  }
  return 3;
}

function BestArticlesSection() {
  const [bestArticles, setBestArticles] = useState<ArticleListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>();

  useEffect(() => {
    setLimit(getBestArticlesLimit());
  }, []);

  useEffect(() => {
    fetchBestArticles();
  }, [limit]);

  const fetchBestArticles = async () => {
    const bestArticlesLimit = getBestArticlesLimit();
    const bestArticles = await getBestArticles({
      limit: bestArticlesLimit,
      order: "like",
    });
    setBestArticles(bestArticles);
    setLoading(false);
  };

  const handleResize = () => {
    setLimit(getBestArticlesLimit());
  };

  useResizeHandler(handleResize, 300);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className={styles.bestArticles}>
      {bestArticles.map((article) => (
        <li key={article.id}>
          <BestArticlesCard {...article} />
        </li>
      ))}
    </ul>
  );
}

export default BestArticlesSection;
