type TernaryProps = {
  a: boolean;
  b: boolean;
};

export default function Ternary({ a, b }: TernaryProps) {
  return (
    <div>
      {a
        ? b
          ? "A i B są prawdziwe"
          : "A jest prawdziwe, B fałszywe"
        : "A jest fałszywe"}
    </div>
  );
}
