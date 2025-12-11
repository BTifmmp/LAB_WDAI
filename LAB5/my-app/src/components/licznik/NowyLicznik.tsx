import { useState } from "react";
import Przycisk from "./Przycisk";

export default function NowyLicznik() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <div>Wartosc {value}</div>
      <Przycisk onClick={() => setValue(value + 1)}>Dodaj</Przycisk>
    </div>
  );
}
