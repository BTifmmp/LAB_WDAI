import { useEffect, useState } from "react";
import Article from "../model/Article";

// Definicja, co hook będzie zwracał
interface ArticleStorageActions {
  articles: Article[];
  addArticle: (newArticle: Omit<Article, "id">) => Article;
  removeArticle: (articleId: number) => void;
  clearArticles: () => void;
}

const getInitialArticles = (key: string): Article[] => {
  try {
    const saved = window.localStorage.getItem(key);
    // Zwraca sparsowane dane lub pustą tablicę
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Błąd odczytu localStorage:", error);
    return []; // Zwraca wartość domyślną w przypadku błędu
  }
};

export function useArticleStorage(): ArticleStorageActions {
  const [articles, setArticles] = useState<Article[]>(
    getInitialArticles("ARTICLES_TASK8")
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("ARTICLES_TASK8", JSON.stringify(articles));
      } catch (error) {
        console.error("Błąd zapisu do localStorage:", error);
      }
    }
  }, [articles]);

  const addArticle = (newArticle: Omit<Article, "id">): Article => {
    const articleWithId: Article = {
      ...newArticle,
      id: Date.now(),
    };

    setArticles((prevArticles: Article[]) => [...prevArticles, articleWithId]);

    return articleWithId;
  };

  const removeArticle = (articleId: number): void => {
    const newArticles = articles.filter(
      (article: Article) => article.id !== articleId
    );

    setArticles(newArticles);
  };

  const clearArticles = (): void => {
    setArticles([]);
  };

  return {
    articles,
    addArticle,
    removeArticle,
    clearArticles,
  };
}
