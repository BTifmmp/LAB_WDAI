import React, { useState, useEffect } from "react";

export default function Tytul() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Wpisz tytuł strony"
      />
    </div>
  );
}
