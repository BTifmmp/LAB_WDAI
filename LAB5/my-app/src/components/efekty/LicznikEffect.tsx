import { useEffect, useState } from "react";

export default function LicznikEffect() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("Wartosc licznika sie zmienila:", value);
  }, [value]);

  useEffect(() => {
    console.log(`I EXIST`);
  });

  return (
    <div>
      <div>Wartosc {value}</div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
}
