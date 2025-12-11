import ArticleCard from "../components/ArticleCard";
import { useArticleStorage } from "../hooks/useArticleStorage";

export default function Blog() {
  const { articles } = useArticleStorage();
  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ display: "flex", flexDirection: "row" }}>
        <a href="/">Home</a>
      </nav>
      <h1>Articles</h1>
      <div>
        {articles.map((article, index) => (
          <div key={article.id}>
            <ArticleCard id={article.id} title={article.title} />
            {index < articles.length - 1 && (
              <div
                style={{
                  borderBottom: "1px solid #000",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
