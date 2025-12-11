import Komentarz, { KomentarzProps } from "./Komentarz";
import React, { useState, useEffect } from "react";

export default function Komentarze() {
  const [komentarze, setKomentarze] = useState<KomentarzProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setKomentarze(data.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Ładowanie...</div>;

  return (
    <div>
      {komentarze.map((komentarz) => (
        <Komentarz
          key={komentarz.id}
          id={komentarz.id}
          body={komentarz.body}
          postId={komentarz.postId}
          likes={komentarz.likes}
          user={komentarz.user}
        />
      ))}
    </div>
  );
}
