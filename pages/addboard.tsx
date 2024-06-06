import React, { useState } from "react";
import axios from "axios";
import ImageInput from "../components/ImageInput";
import style from "../styles/addboard.module.css";

interface Values {
  productName: string;
  description: string;
}

function Addboard() {
  const [values, setValues] = useState<Values>({
    productName: "",
    description: "",
  });

  const [image, setImage] = useState<string | null>(null);

  const isButtonActive = values.productName && values.description.length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 테스트용 액세스 토큰
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzE3NjY0MTAxLCJleHAiOjE3MTc2NjU5MDEsImlzcyI6InNwLXBhbmRhLW1hcmtldCJ9.0NPJH3Gqd4dQftLalRZdP8x5-7d5ZhSKqP6JBiYA73w";

    try {
      const postData = {
        content: values.description,
        title: values.productName,
        ...(image && { image }),
      };

      const response = await axios.post(
        "https://panda-market-api.vercel.app/articles",
        postData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("게시물이 성공적으로 등록되었습니다.", response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("인증 실패: 액세스 토큰이 유효하지 않습니다.");
      } else {
        console.error("게시물 등록 중 오류 발생:", error.response.data);
      }
    }
  };

  return (
    <div>
      <form className={style.addItemForm} onSubmit={handleSubmit}>
        <div className={style.formTitle}>
          <h1 className={style.formTitleText}>게시글 쓰기</h1>
          <button
            className={`${style.addItemButton} ${
              isButtonActive ? style.activeAddButton : ""
            }`}
            disabled={!isButtonActive}
            type="submit"
          >
            등록
          </button>
        </div>
        <div className={style.formInput}>
          <label className={style.inputLabelText}>*제목</label>
          <input
            className={style.formInputItem}
            name="productName"
            value={values.productName}
            placeholder="제목을 입력해주세요"
            onChange={handleChange}
          />
          <label className={style.inputLabelText}>*내용</label>
          <textarea
            className={style.productDescription}
            name="description"
            value={values.description}
            placeholder="내용을 입력해주세요"
            onChange={handleChange}
          />
          <ImageInput
            className="imageInputItem"
            onImageChange={handleImageChange}
            onImageDelete={handleImageDelete}
            image={image}
          />
        </div>
      </form>
    </div>
  );
}

export default Addboard;
