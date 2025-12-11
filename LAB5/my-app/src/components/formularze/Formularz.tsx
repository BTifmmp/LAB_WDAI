import { useState } from "react";

export default function Formularz() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>text: {text}</div>
    </div>
  );
}
