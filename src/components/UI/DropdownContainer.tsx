import React, { useState } from "react";
import "./DropdownContainer.css";
import SortIcon from "../../assets/ic_sort.svg";

interface DropdownContainerProps {
  onNewestClick: () => void;
  onBestClick: () => void;
}

const DropdownContainer = ({
  onNewestClick,
  onBestClick,
}: DropdownContainerProps) => {
  const [isDropdownView, setDropdownView] = useState(false);

  const handleClickContainer = () => {
    setDropdownView((prevState) => !prevState);
  };

  const handleItemClick = (clickHandler: () => void) => {
    clickHandler();
    setDropdownView(false);
  };

  return (
    <div>
      <div className="dropdown-container" onClick={handleClickContainer}>
        <button className="dropdown-button">
          <img src={SortIcon} alt="Sort Icon" />
        </button>
        {isDropdownView && (
          <ul className="dropdown-items">
            <li
              className="dropdown-item"
              onClick={() => handleItemClick(onNewestClick)}
            >
              최신순
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleItemClick(onBestClick)}
            >
              인기순
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownContainer;
