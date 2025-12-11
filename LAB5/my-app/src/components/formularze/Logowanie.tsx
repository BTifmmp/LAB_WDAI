import { useEffect, useState } from "react";

export default function Logowanie() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (password === "" || repeatPassword === "" || username === "") {
      setButtonDisabled(true);
      return;
    }
    setButtonDisabled(false);
  }, [password, repeatPassword, username]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="username">Hasło:</label>
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        name="username"
        type="text"
        placeholder="Username"
      />
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
      <button
        disabled={buttonDisabled}
        onClick={() => {
          if (password === repeatPassword) alert("Zalogowano");
          else alert("Hasła nie są identyczne");
        }}
      >
        Zaloguj
      </button>
    </div>
  );
}
