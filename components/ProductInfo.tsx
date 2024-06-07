import React from "react";
import Image from "next/image";

interface ProductInfoProps {
  article: {
    title: string;
    content: string;
    image: string;
    likeCount: number;
    createdAt: string;
    writer: {
      nickname: string;
    };
  };
}

function ProductInfo({ article }: ProductInfoProps) {
  const { image, title, content, likeCount, createdAt, writer } = article;

  return (
    <section className="articleInfo">
      <div className="articleInfotopItems">
        <h1 className="">{title}</h1>
        <div>
          <p>{writer.nickname}</p>
          <p>{createdAt}</p>
          <div>
            <p>{likeCount}</p>
          </div>
        </div>
      </div>
      <Image width={72} height={72} src={image} alt="best article image" />
      <p className="">{content}</p>
    </section>
  );
}

export default ProductInfo;
