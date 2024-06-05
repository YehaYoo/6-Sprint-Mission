import React, { useEffect, useState } from "react";
import debounce from "lodash-es/debounce";
import Articles, { ArticleListProps } from "./Articles";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { getArticles } from "../lib/api";
import styles from "../styles/boards.module.css";

const AllArticlesSection = () => {
  const [articles, setArticles] = useState<ArticleListProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentOrder, setCurrentOrder] = useState<"recent" | "like">("recent");
  const [filteredArticles, setFilteredArticles] = useState<ArticleListProps[]>(
    []
  );

  const fetchArticles = async (order: "recent" | "like") => {
    setLoading(true);
    try {
      const data = await getArticles({ limit: 10, order });
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (order: "recent" | "like") => {
    setCurrentOrder(order);
    await fetchArticles(order);
  };

  useEffect(() => {
    fetchArticles(currentOrder);
  }, [currentOrder]);

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
      <section className={styles.articleSection}>
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
      </section>
    </div>
  );
};

export default AllArticlesSection;
