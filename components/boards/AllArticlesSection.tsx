import React, { useEffect, useReducer, useState } from "react";
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

interface PaginationState {
  currentOrder: Order;
  currentPage: number;
  searchKeyword: string;
  totalPages: number;
}

type PaginationAction =
  | { type: "SET_ORDER"; payload: Order }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_KEYWORD"; payload: string }
  | { type: "SET_TOTAL_PAGES"; payload: number };

const initialState = (initialTotalPages: number): PaginationState => ({
  currentOrder: "recent",
  currentPage: 1,
  searchKeyword: "",
  totalPages: initialTotalPages,
});

const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
): PaginationState => {
  switch (action.type) {
    case "SET_ORDER":
      return { ...state, currentOrder: action.payload, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_KEYWORD":
      return { ...state, searchKeyword: action.payload, currentPage: 1 };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};

const AllArticlesSection = ({
  initialAllArticles,
  initialTotalPages,
}: AllArticlesSectionProps) => {
  const [articles, setArticles] =
    useState<ArticleListProps[]>(initialAllArticles);
  const [loading, setLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(
    paginationReducer,
    initialTotalPages,
    initialState
  );

  const { currentOrder, currentPage, searchKeyword, totalPages } = state;

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
      dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    } catch (error: any) {
      console.error("Failed to fetch articles", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (order: Order) => {
    dispatch({ type: "SET_ORDER", payload: order });
    await fetchArticles(order, 1, searchKeyword);
  };

  const handlePageChange = async (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
    await fetchArticles(currentOrder, page, searchKeyword);
  };

  useEffect(() => {
    fetchArticles(currentOrder, currentPage, searchKeyword);
  }, [initialAllArticles]);

  const debouncedFetchArticles = debounce(async (searchTerm: string) => {
    dispatch({ type: "SET_KEYWORD", payload: searchTerm });
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
