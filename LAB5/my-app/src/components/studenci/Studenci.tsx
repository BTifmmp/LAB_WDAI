type Student = {
  imie: string;
  nazwisko: string;
  rocznik: number;
};

export default function Studenci() {
  const studenci: Student[] = [
    { imie: "Jan", nazwisko: "Kowalski", rocznik: 2000 },
    { imie: "Anna", nazwisko: "Nowak", rocznik: 1999 },
    { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2001 },
  ];

  return (
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
  );
}
