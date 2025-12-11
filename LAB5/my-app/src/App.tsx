import "./App.css";
import Koszyk from "./components/koszyk/Koszyk";
import Licznik from "./components/licznik/Licznik";
import NowyLicznik from "./components/licznik/NowyLicznik";
import Formularz from "./components/formularze/Formularz";
import Logowanie from "./components/formularze/Logowanie";
import Ternary from "./components/inne/Ternary";
import Aktualizacja from "./components/inne/Aktualizacja";
import StudentManager from "./components/studenci/StudentManager";
import LicznikEffect from "./components/efekty/LicznikEffect";
import Tytul from "./components/efekty/Tytul";
import Odliczanie from "./components/efekty/Odliczanie";
import Komentarze from "./components/produkty/Komentarze";

function App() {
  return (
    <div>
      <Koszyk />
      <Licznik />
      <NowyLicznik />
      <Formularz />
      <Logowanie />
      <Ternary a={false} b={false} />
      <Aktualizacja />
      <StudentManager />
      <LicznikEffect />
      <Tytul />
      <Odliczanie />
      <Komentarze />
    </div>
  );
}

export default App;
