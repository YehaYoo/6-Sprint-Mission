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
}

const AllArticlesSection = ({
  initialAllArticles,
}: AllArticlesSectionProps) => {
  const [articles, setArticles] = useState<ArticleListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order>("recent");
  const [filteredArticles, setFilteredArticles] = useState<ArticleListProps[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchArticles = async (order: Order, page: number) => {
    setLoading(true);
    try {
      const data = await getArticles({ limit: 10, order, page });
      setArticles(data);
      setFilteredArticles(data);
    } catch (error: any) {
      console.error("Failed to fetch articles", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (order: Order) => {
    setCurrentOrder(order);
    await fetchArticles(order, currentPage);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchArticles(currentOrder, page);
  };

  useEffect(() => {
    fetchArticles(currentOrder, currentPage);
  }, [initialAllArticles]);

  const debouncedFetchArticles = debounce(async (searchTerm: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
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
        <Articles articles={filteredArticles} />
        <PaginationButton
          totalPageNum={10}
          activePageNum={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default AllArticlesSection;
