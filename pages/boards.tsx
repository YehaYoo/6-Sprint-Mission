import React, { useEffect, useState } from "react";
import debounce from "lodash-es/debounce";
import Articles, { ArticleListProps } from "../components/Articles";
import { getArticles, getBestArticles } from "../lib/api";
import BestArticlesSection from "../components/BestArticlesSection";
import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";
import useResizeHandler from "../components/useResizeHandler";
import styles from "../styles/boards.module.css";

const getBestArticlesLimit = () => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width < 768) {
      return 1;
    } else if (width < 1280) {
      return 2;
    } else {
      return 3;
    }
  }
  return 3;
};

export default function Boards() {
  const [articles, setArticles] = useState<ArticleListProps[]>([]);
  const [bestArticles, setBestArticles] = useState<ArticleListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentOrder, setCurrentOrder] = useState<"recent" | "like">("recent");
  const [filteredArticles, setFilteredArticles] = useState<ArticleListProps[]>(
    []
  );
  const [limit, setLimit] = useState<number>(3);

  const fetchArticles = async (order: "recent" | "like") => {
    setLoading(true);
    try {
      const data = await getArticles({ limit: 10, order });
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBestArticles = async () => {
    if (typeof window !== "undefined") {
      const bestArticlesLimit = getBestArticlesLimit();
      const bestArticles = await getBestArticles({
        limit: bestArticlesLimit,
        order: "like",
      });
      setBestArticles(bestArticles);
    }
  };

  useEffect(() => {
    fetchArticles(currentOrder);
  }, [currentOrder]);

  useEffect(() => {
    fetchBestArticles();
  }, [limit]);

  const handleSortChange = async (order: "recent" | "like") => {
    setCurrentOrder(order);
    await fetchArticles(order);
  };

  const debouncedFetchArticles = debounce(async (searchTerm: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, 300);

  const handleSearch = (searchTerm: string) => {
    debouncedFetchArticles(searchTerm);
  };

  const handleResize = () => {
    setLimit(getBestArticlesLimit());
    fetchBestArticles();
  };

  useResizeHandler(handleResize, 500);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.articleSectionWrapper}>
      <section className={styles.articleSection}>
        <section className={styles.bestArticleSection}>
          <p className={styles.articleSectionTitle}>베스트 게시글</p>
          <BestArticlesSection articles={bestArticles} />
        </section>
        <section>
          <div>
            <div className={styles.articleSectioMenu}>
              <p className={styles.articleSectionTitle}>게시글</p>
              <button className={styles.articleSectionButton}>글쓰기</button>
            </div>
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
      </section>
    </div>
  );
}
