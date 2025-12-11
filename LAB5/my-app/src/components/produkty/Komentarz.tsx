import React, { useState } from "react";

export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

export default function Komentarz({
  id,
  body,
  postId,
  likes: initialLikes,
  user,
}: KomentarzProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [userReaction, setUserReaction] = useState<"up" | "down" | null>(null);

  const handleThumbUp = () => {
    if (userReaction === "up") {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      setLikes(likes + (userReaction === "down" ? 2 : 1));
      setUserReaction("up");
    }
  };

  const handleThumbDown = () => {
    if (userReaction === "down") {
      setLikes(likes + 1);
      setUserReaction(null);
    } else {
      setLikes(likes - (userReaction === "up" ? 2 : 1));
      setUserReaction("down");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "12px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <h4 style={{ margin: "0 0 4px 0" }}>{user.username}</h4>
        <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
          {user.fullName}
        </p>
      </div>
      <p style={{ margin: "12px 0" }}>{body}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          color: "#666",
        }}
      >
        <span>Post #{postId}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              opacity: userReaction === "up" ? 1 : 0.6,
            }}
            onClick={handleThumbUp}
            title="Lubię"
          >
            👍
          </button>
          <span>{likes}</span>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              opacity: userReaction === "down" ? 1 : 0.6,
            }}
            onClick={handleThumbDown}
            title="Nie lubię"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
}
