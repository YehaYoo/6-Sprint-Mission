import React, { useState } from "react";
import { postComment, getArticleComments } from "../lib/api";
import { isEmpty } from "lodash";

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
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <section className="commentSection">
      <p className="comment__title">댓글 달기</p>
      <form className="commentInput" onSubmit={handleSubmit}>
        <textarea
          className="commentInput__textarea"
          placeholder="댓글을 입력해주세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="commentInput__Button" disabled={!commentText.trim()}>
          등록
        </button>
      </form>
      <div className="commentContainer">
        {isEmpty(comments) ? (
          <div className="commentEmpty">
            <p className="commentEmptyMessage">
              아직 댓글이 없어요, 지금 댓글을 달아보세요!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <button className="commentKebab"></button>
              <div>
                <p className="commentContent">{comment.content}</p>
              </div>
              <div className="commentInfo">
                <div className="commentInfoItems">
                  <p className="commentInfoNickname">
                    {comment.writer.nickname}
                  </p>
                  <p className="commentInfoUpdateAt">
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
