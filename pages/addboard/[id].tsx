import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductInfo from "../../components/addboard/ArticleInfo";
import CommentSection from "../../components/addboard/CommentSection";
import { getArticleInfo, getArticleComments } from "../../lib/api";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/[id].module.css";
import { Comment } from "@/types";

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

function useProductData(numericArticleID: number | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (numericArticleID === undefined) {
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

function useCommentData(numericArticleID: number | undefined) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (numericArticleID === undefined) {
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

  return { comments, isLoading, error, setComments };
}

function CommunityFeedPage() {
  const router = useRouter();

  const { id } = router.query;

  const numericArticleID: number | undefined =
    typeof id === "string" ? parseInt(id, 10) : undefined;

  if (numericArticleID === undefined || isNaN(numericArticleID)) {
    return <div>Error: Invalid article ID</div>;
  }

  const {
    article,
    isLoading: productLoading,
    error: productError,
  } = useProductData(numericArticleID);

  const {
    comments,
    isLoading: commentLoading,
    error: commentError,
    setComments,
  } = useCommentData(numericArticleID);

  if (productLoading || commentLoading) {
    return <div>Loading...</div>;
  }

  if (productError || commentError) {
    return <div>Error: {productError?.message || commentError?.message}</div>;
  }

  return (
    <section>
      <div className={styles.communitySectionWrapper}>
        {article && <ProductInfo article={article} />}
        <CommentSection
          comments={comments}
          numericArticleID={numericArticleID}
          setComments={setComments}
        />
        <Link href="/boards" className={styles.communitySectionLink}>
          <p className={styles.linkText}>목록으로 돌아가기</p>
          <Image src="/images/icBack.svg" width={24} height={24} alt="back" />
        </Link>
      </div>
    </section>
  );
}

export default CommunityFeedPage;
