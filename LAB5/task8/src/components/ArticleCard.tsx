interface ArticleCardProps {
  id: number;
  title: string;
}

export default function ArticleCard({ id, title }: ArticleCardProps) {
  return (
    <div>
      <div>Article #{id}</div>
      <a
        href={`/article/${id}`}
        style={{
          color: "blue",
          padding: "10px 0",
          display: "block",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {title}
      </a>
    </div>
  );
}
