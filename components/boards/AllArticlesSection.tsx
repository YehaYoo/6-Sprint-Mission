import React, { useEffect, useState } from "react";
import debounce from "lodash-es/debounce";
import Articles, { ArticleListProps } from "./Articles";
import Dropdown from "../UI/Dropdown";
import SearchBar from "../UI/SearchBar";
import PaginationButton from "../UI/PaginationButton";
import { getArticles } from "../../lib/api";
import styles from "../../styles/boards.module.css";
import { Order } from "@/types";

interface AllArticlesSectionProps {
  initialAllArticles: ArticleListProps[];
  initialTotalPages: number;
}

const AllArticlesSection = ({
  initialAllArticles,
  initialTotalPages,
}: AllArticlesSectionProps) => {
  const [articles, setArticles] =
    useState<ArticleListProps[]>(initialAllArticles);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order>("recent");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);

  const fetchArticles = async (
    order: Order,
    page: number,
    keyword: string = ""
  ) => {
    setLoading(true);
    try {
      const response = await getArticles({ limit: 10, order, page, keyword });
      console.log("API response:", response);
      const { articles, totalPages } = response;
      setArticles(articles);
      setTotalPages(totalPages);
    } catch (error: any) {
      console.error("Failed to fetch articles", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (order: Order) => {
    setCurrentOrder(order);
    setCurrentPage(1);
    await fetchArticles(order, 1, searchKeyword);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchArticles(currentOrder, page, searchKeyword);
  };

  useEffect(() => {
    fetchArticles(currentOrder, currentPage, searchKeyword);
  }, [initialAllArticles]);

  const debouncedFetchArticles = debounce(async (searchTerm: string) => {
    setSearchKeyword(searchTerm);
    setCurrentPage(1);
    await fetchArticles(currentOrder, 1, searchTerm);
  }, 300);

  const handleSearch = (searchTerm: string) => {
    debouncedFetchArticles(searchTerm);
  };

  return (
    <div className={styles.articleSectionWrapper}>
      <section className={styles.articleSectionItems}>
        <div className={styles.articleSectioMenu}>
          <p className={styles.articleSectionTitle}>게시글</p>
          <button className={styles.articleSectionButton}>글쓰기</button>
        </div>
        <div>
          <div className={styles.searchbarDropdownWrapper}>
            <SearchBar onSearch={handleSearch} />
            <div>
              <Dropdown
                onSortByNewest={() => handleSortChange("recent")}
                onSortByBest={() => handleSortChange("like")}
                order={currentOrder}
              />
            </div>
          </div>
        </div>
        {loading ? <p>Loading...</p> : <Articles articles={articles} />}
        <PaginationButton
          totalPageNum={totalPages}
          activePageNum={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default AllArticlesSection;
