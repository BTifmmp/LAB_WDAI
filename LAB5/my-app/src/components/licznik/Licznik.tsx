import { useState } from "react";

export default function Licznik() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <div>Wartosc {value}</div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
}
