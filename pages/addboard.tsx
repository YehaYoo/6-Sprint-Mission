import React, { useState } from "react";
import ImageInput from "../components/ImageInput";
import style from "../styles/addboard.module.css";

interface Values {
  productName: string;
  description: string;
}
function AddItem() {
  const [values, setValues] = useState<Values>({
    productName: "",
    description: "",
  });

  const [image, setImage] = useState<Blob | null>(null);

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
    setImage(file);
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  return (
    <div>
      <form className={style.addItemForm}>
        <div className="formTitle">
          <h1>게시글 쓰기</h1>
          <button
            className={`addItemButton ${
              isButtonActive ? "activeAddButton" : ""
            }`}
            disabled={!isButtonActive}
            type="submit"
          >
            등록
          </button>
        </div>
        <div className="formInput">
          <label>제목</label>
          <input
            className="formInputItem"
            name="productName"
            value={values.productName}
            placeholder="제목을 입력해주세요"
            onChange={handleChange}
          />
          <label>내용</label>
          <textarea
            className="productDescription"
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

export default AddItem;
