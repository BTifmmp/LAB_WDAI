import { useState } from "react";

export default function Aktualizacja() {
  const [produkt, setProdukt] = useState({
    nazwa: "Produkt A",
    cena: 50,
  });
  return (
    <div>
      <div>{produkt.nazwa}</div>
      <div>{produkt.cena} PLN</div>
      <button onClick={() => setProdukt({ ...produkt, cena: 100 })}>
        Zwiększ cenę o 10 PLN
      </button>
    </div>
  );
}
