type PrzyciskProps = {
  onClick?: () => void;
  text?: string;
  children?: React.ReactNode;
};

export default function Przycisk({ onClick, text, children }: PrzyciskProps) {
  return <button onClick={onClick}>{children}</button>;
}
