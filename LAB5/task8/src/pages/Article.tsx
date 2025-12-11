import { useParams } from "react-router-dom";
import { useArticleStorage } from "../hooks/useArticleStorage";

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const { getArticles } = useArticleStorage();
  const article = getArticles().find((a) => a.id === Number(id)) || null;

  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ display: "flex", flexDirection: "row" }}>
        <a href="/blog">Blog</a>
      </nav>
      {article ? (
        <article>
          <h1>{article.title}</h1>
          <div>{article.content}</div>
        </article>
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
}
