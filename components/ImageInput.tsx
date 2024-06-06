import React, { useRef } from "react";
import style from "./ImageInput.module.css";
import Image from "next/image";

interface ImageInputProps {
  onImageChange: (file: File) => void;
  onImageDelete: () => void;
  image: Blob | MediaSource | null;
  className?: string;
}

function ImageInput({ onImageChange, onImageDelete, image }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDelete = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onImageDelete();
  };

  return (
    <div>
      <p className={style.addItemTitle}>이미지</p>
      <div className={style.fileInputContainer}>
        <label className={style.imageFileInput} htmlFor="file">
          <div className={style.inputItems}>
            <Image
              className={style.imageAddButton}
              width={48}
              height={48}
              src="/images/imageFile_+.svg"
              alt="이미지 추가"
            />
            <p className={style.addImage}> 이미지 등록</p>
          </div>
        </label>
        <div>
          {image && (
            <div className={style.previewContainer}>
              <Image
                width={282}
                height={282}
                className={style.imgPreview}
                src={URL.createObjectURL(image)}
                alt="이미지"
              />
              <button className={style.deleteButton} onClick={handleDelete}>
                <Image
                  width={20}
                  height={20}
                  className={style.imgDeleteIcon}
                  src="/images/imageFile_x.svg"
                  alt="이미지 삭제"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="file"
        className={style.inputFile}
      ></input>
    </div>
  );
}

export default ImageInput;
