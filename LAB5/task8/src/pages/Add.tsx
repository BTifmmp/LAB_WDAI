import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticleStorage } from "../hooks/useArticleStorage";

export default function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const { addArticle } = useArticleStorage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content });
    setTitle("");
    setContent("");
    nav("/blog");
    addArticle({ title, content });
  };

  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ display: "flex", flexDirection: "row" }}>
        <a href="/">Home</a>
      </nav>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
