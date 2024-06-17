import React, { useState } from "react";
import Image from "next/image";
import styles from "./Dropdown.module.css";
import { Order } from "@/types";

interface DropdownContainerProps {
  onSortByNewest: () => void;
  onSortByBest: () => void;
  order: Order;
}

const Dropdown = ({
  onSortByNewest,
  onSortByBest,
  order,
}: DropdownContainerProps) => {
  const [isDropdownView, setDropdownView] = useState(false);

  const buttonText = order === "recent" ? "최신순" : "인기순";

  const handleClickContainer = () => {
    setDropdownView((prevState) => !prevState);
  };

  const handleItemClick = (clickHandler: () => void) => {
    clickHandler();
    setDropdownView(false);
  };

  return (
    <div>
      <div className={styles.dropdownContainer} onClick={handleClickContainer}>
        <button className={styles.dropdownButton}>
          <span className={styles.dropdownButtonText}>
            {buttonText} &nbsp;&nbsp; ▼
          </span>
          <Image
            className={styles.dropdownButtonImage}
            src="/images/btnSort.svg"
            width={42}
            height={42}
            alt="dropdown button"
          />
        </button>
        {isDropdownView && (
          <ul className={styles.dropdownItems}>
            <li
              className={styles.dropdownItem}
              onClick={() => handleItemClick(onSortByNewest)}
            >
              최신순
            </li>
            <li
              className={styles.dropdownItem}
              onClick={() => handleItemClick(onSortByBest)}
            >
              인기순
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
