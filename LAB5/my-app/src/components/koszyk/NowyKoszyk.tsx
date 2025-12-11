import Produkt from "./Produkt";

export default function NowyKoszyk() {
  let products = [
    "some_name1",
    "some_name2",
    "some_name3",
    "some_name4",
    "some_name5",
  ];
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <Produkt name={product} />
        </div>
      ))}
    </div>
  );
}
