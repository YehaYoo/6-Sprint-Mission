import React, { useState } from "react";
import { isEmpty } from "lodash";
// import EmptyComment from "../../../assets/inquiry_empty.svg";
// import kebabIcon from "../../../assets/ic_kebab.svg";

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
}

function CommentSection({ comments }: CommentProps) {
  const [commentText, setCommentText] = useState<string>("");

  return (
    <section className="commentSection">
      <p className="comment__title">댓글 달기</p>
      <form className="commentInput">
        <textarea
          className="commentInput__textarea"
          placeholder="댓글을 입력해주세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="commentInput__Button"
          type="submit"
          disabled={!commentText.trim()}
        >
          등록
        </button>
      </form>
      <div className="commentContainer">
        {isEmpty(comments) ? (
          <div className="commentEmpty">
            {/* <img
              className="comment--empty-Image"
              src={EmptyComment}
              alt="EmptyComment"
            /> */}
            <p className="commentEmptyEessage">
              아직 댓글이 없어요, 지금 댓글을 달아보세요!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <button className="commentKebab">
                {/* <img src={kebabIcon} alt="kebabIcon" /> */}
              </button>
              <div>
                <p className="commentContent">{comment.content}</p>
              </div>
              <div className="commentInfo">
                {/* <img className="commentInfo__img" src={comment.writer.image} /> */}
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
