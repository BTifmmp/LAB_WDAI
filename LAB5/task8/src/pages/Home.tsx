export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to the Home Page</h1>
      <p>
        Design inspired by{" "}
        <a href="https://motherfuckingwebsite.com">motherfuckingwebsite.com</a>
      </p>
      <nav style={{ display: "flex", flexDirection: "column" }}>
        <div>Links:</div>
        <a href="/blog">Blog</a>
        <a href="/add">Add article</a>
      </nav>
    </div>
  );
}
