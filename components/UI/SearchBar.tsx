import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.searchBar}
        type="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="검색할 상품을 입력해주세요"
      />
    </form>
  );
};

export default SearchBar;
