import { useEffect, useState } from "react";

export default function Haslo() {
  const [info, setInfo] = useState("Wpisz hasło");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    if (password === "" && repeatPassword === "") {
      setInfo("Wpisz hasło");
      return;
    }
    setInfo(password === repeatPassword ? "" : "Hasła nie są zgodne");
  }, [password, repeatPassword]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="password">Hasło:</label>
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        name="password"
        type="password"
        placeholder="Wpisz hasło"
      />
      <label htmlFor="repeat-password">Potwierdź hasło:</label>
      <input
        value={repeatPassword}
        onChange={(e) => {
          setRepeatPassword(e.target.value);
        }}
        name="repeat-password"
        type="password"
        placeholder="Potwierdź hasło"
      />
      <div>{info}</div>
    </div>
  );
}
