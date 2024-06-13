import React, { useState } from "react";
import { postComment, getArticleComments } from "../lib/api";
import { isEmpty } from "lodash";
import Image from "next/image";
import styles from "./CommentSection.module.css";

function formatRelativeDate(dateString: number) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "오늘";
  } else if (diffDays === 1) {
    return "어제";
  } else {
    return `${diffDays}일 전`;
  }
}

interface Comment {
  id: number;
  content: string;
  updatedAt: number;
  writer: {
    image: string;
    nickname: string;
  };
}

interface CommentProps {
  comments: Comment[];
  numericArticleID: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentSection({
  comments,
  numericArticleID,
  setComments,
}: CommentProps) {
  const [commentText, setCommentText] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInNjb3BlIjoicmVmcmVzaCIsImlhdCI6MTcxNzY1ODMzMCwiZXhwIjoxNzE4MjYzMTMwLCJpc3MiOiJzcC1wYW5kYS1tYXJrZXQifQ.D-jcuvSNCR65Qj1sbenHsi_EkABnh8xw8fGb49mD4AA";

    try {
      await postComment(numericArticleID, commentText, accessToken);
      setCommentText("");
      const updatedComments = await getArticleComments(numericArticleID);
      setComments(updatedComments);
    } catch (error: any) {
      console.error("Failed to post comment:", error);
      alert(error.message);
    }
  };

  return (
    <section className={styles.commentSection}>
      <p className={styles.commenTitle}>댓글 달기</p>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.commenTextArea}
          placeholder="댓글을 입력해주세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className={`${styles.commentInputButton} ${
            commentText.trim() ? styles.commentInputButtonEnabled : ""
          }`}
          disabled={!commentText.trim()}
        >
          등록
        </button>
      </form>
      <div className={styles.commentContainer}>
        {isEmpty(comments) ? (
          <div className={styles.commentEmptyWrapper}>
            <div className={styles.commentEmpty}>
              <Image
                className={styles.commentEmptyImage}
                src="/images/replyEmpty.svg"
                width={120}
                height={120}
                alt="profile"
              />
              <p className={styles.commentEmptyMessage}>
                아직 댓글이 없어요, <br />
                지금 댓글을 달아보세요!
              </p>
            </div>
          </div>
        ) : (
          comments.map((comment) => (
            <div className={styles.commentWrapper} key={comment.id}>
              <div className={styles.comment}>
                <p className={styles.commentContent}>{comment.content}</p>
                <button className={styles.commentKebab}>
                  <Image
                    src="/images/icKebab.svg"
                    width={24}
                    height={24}
                    alt="kebab icon"
                  />
                </button>
              </div>
              <div className={styles.commentInfo}>
                <Image
                  src="/images/profile.svg"
                  width={24}
                  height={24}
                  alt="profile"
                />
                <div className={styles.commentInfoItems}>
                  <p className={styles.commentInfoNickname}>
                    {comment.writer.nickname}
                  </p>
                  <p className={styles.commentInfoUpdateAt}>
                    {formatRelativeDate(comment.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CommentSection;
