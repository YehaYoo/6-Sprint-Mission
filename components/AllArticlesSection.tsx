import React, { useEffect, useState } from "react";
import debounce from "lodash-es/debounce";
import Articles, { ArticleListProps } from "./Articles";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { getArticles } from "../lib/api";
import styles from "../styles/boards.module.css";
import { Order } from "@/types";

interface AllArticlesSectionProps {
  initialAllArticles: ArticleListProps[];
}

const AllArticlesSection = ({
  initialAllArticles,
}: AllArticlesSectionProps) => {
  const [articles, setArticles] =
    useState<ArticleListProps[]>(initialAllArticles);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order>("recent");
  const [filteredArticles, setFilteredArticles] =
    useState<ArticleListProps[]>(initialAllArticles);

  const fetchArticles = async (order: Order) => {
    setLoading(true);
    try {
      const data = await getArticles({ limit: 10, order });
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
    await fetchArticles(order);
  };

  useEffect(() => {
    if (initialAllArticles.length === 0) {
      fetchArticles(currentOrder);
    }
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
      </section>
    </div>
  );
};

export default AllArticlesSection;
