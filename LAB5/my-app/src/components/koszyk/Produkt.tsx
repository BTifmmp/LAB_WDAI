type ProduktProps = {
  name?: string;
};

export default function Produkt({ name }: ProduktProps) {
  return (
    <div>
      <div>{name}</div>
      <p>This is the Produkt component content.</p>
    </div>
  );
}
