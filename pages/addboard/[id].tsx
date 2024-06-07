import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductInfo from "../../components/ProductInfo";
import CommentSection from "../../components/CommentSection";
import { getArticleInfo, getArticleComments } from "../../lib/api";
import Link from "next/link";
import styles from "../../styles/[id].module.css";

interface Comment {
  id: number;
  content: string;
  updatedAt: number;
  writer: {
    image: string;
    nickname: string;
  };
}

interface Writer {
  nickname: string;
}

interface Article {
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  writer: Writer;
}

function useProductData(numericArticleID: number | null) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (numericArticleID === null) {
      setError({ message: "Invalid article ID" });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    getArticleInfo(numericArticleID)
      .then((data) => {
        const formattedData: Article = {
          title: data.title,
          content: data.content,
          image: data.image,
          likeCount: data.likeCount,
          createdAt: data.createdAt,
          writer: {
            nickname: data.writer.nickname,
          },
        };
        setArticle(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError({ message: error.message || "Unknown error" });
        setIsLoading(false);
      });
  }, [numericArticleID]);

  return { article, isLoading, error };
}

function useCommentData(numericArticleID: number | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (numericArticleID === null) {
      setError({ message: "Invalid article ID" });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    getArticleComments(numericArticleID)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError({ message: error.message || "Unknown error" });
        setIsLoading(false);
      });
  }, [numericArticleID]);

  return { comments, isLoading, error };
}

function CommunityFeedPage() {
  const router = useRouter();

  const { id } = router.query;

  const numericArticleID = id ? Number(id) : null;
  console.log(id);

  const {
    article,
    isLoading: productLoading,
    error: productError,
  } = useProductData(numericArticleID);

  const {
    comments,
    isLoading: commentLoading,
    error: commentError,
  } = useCommentData(numericArticleID);

  if (productLoading || commentLoading) {
    return <div>Loading...</div>;
  }

  if (productError || commentError) {
    return <div>Error: {productError?.message || commentError?.message}</div>;
  }

  return (
    <section className="CommunitySection">
      <div className={styles.communitySectionWrapper}>
        {article && <ProductInfo article={article} />}
        <CommentSection comments={comments} />
        <Link href="/boards" className="CommunitySection__link">
          <p>목록으로 돌아가기</p>
        </Link>
      </div>
    </section>
  );
}

export default CommunityFeedPage;
