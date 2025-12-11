import { useState } from "react";

type Student = {
  imie: string;
  nazwisko: string;
  rocznik: number;
};

export default function Studenci() {
  const [studenci, setStudenci] = useState<Student[]>([
    { imie: "Jan", nazwisko: "Kowalski", rocznik: 2000 },
    { imie: "Anna", nazwisko: "Nowak", rocznik: 1999 },
    { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2001 },
  ]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {studenci.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newStudent: Student = {
              imie: formData.get("imie") as string,
              nazwisko: formData.get("nazwisko") as string,
              rocznik: parseInt(formData.get("rocznik") as string),
            };
            setStudenci([...studenci, newStudent]);
            e.currentTarget.reset();
          }}
        >
          <input name="imie" placeholder="Imię" required />
          <input name="nazwisko" placeholder="Nazwisko" required />
          <input name="rocznik" type="number" placeholder="Rocznik" required />
          <button type="submit">Dodaj studenta</button>
        </form>
      </div>
    </>
  );
}
