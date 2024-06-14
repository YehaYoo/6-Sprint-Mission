import React from "react";
import { range } from "lodash-es";
import styles from "./PaginationButton.module.css";
import Image from "next/image";

interface PaginationButtonProps {
  totalPageNum: number;
  activePageNum: number;
  onPageChange: (pageNum: number) => void;
}

const PaginationButton = ({
  totalPageNum,
  activePageNum,
  onPageChange,
}: PaginationButtonProps) => {
  const maxVisiblePages = 5;

  let startPage = 1;

  if (totalPageNum > maxVisiblePages) {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = range(
    startPage,
    Math.min(startPage + maxVisiblePages, totalPageNum + 1)
  );

  const handlePageChange = (pageNum: number) => {
    onPageChange(pageNum);
  };

  return (
    <div className={styles.paginationButtonContainer}>
      <button
        className={`${styles.paginationButtonItem} ${
          activePageNum === 1 ? styles.inactive : ""
        }`}
        disabled={activePageNum === 1}
        onClick={() => handlePageChange(activePageNum - 1)}
      >
        <Image
          className={styles.PaginationButtonImage}
          width={16}
          height={16}
          alt="prev button"
          src="/images/activeLeftArrow.svg"
        />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.paginationButtonItem} ${
            activePageNum === page ? styles.active : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`${styles.paginationButtonItem} ${
          activePageNum === totalPageNum ? styles.inactive : ""
        }`}
        disabled={activePageNum === totalPageNum}
        onClick={() => handlePageChange(activePageNum + 1)}
      >
        <Image
          className={styles.PaginationButtonImage}
          width={16}
          height={16}
          alt="next button"
          src="/images/activeRightArrow.svg"
        />
      </button>
    </div>
  );
};

export default PaginationButton;
