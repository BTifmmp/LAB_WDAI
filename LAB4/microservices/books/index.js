const express = require("express");
const app = express();
const PORT = 3001;

const sequelize = require("./database/db.config");

const BookModel = require("./database/models/Book");

const bookRoutes = require("./routes/books.routes");

app.use(express.json());

app.use("/api", bookRoutes);

const initializeDatabaseAndStartServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Połączenie z bazą danych (SQLite) zostało ustanowione pomyślnie."
    );

    await sequelize.sync({ alter: true });
    console.log(
      "Baza danych zsynchronizowana pomyślnie (tabela books gotowa)."
    );

    app.listen(PORT, () => {
      console.log(`Serwis Books działa na http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Błąd inicjalizacji bazy danych lub serwera:", error);
    process.exit(1);
  }
};

initializeDatabaseAndStartServer();
