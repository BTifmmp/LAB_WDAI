const express = require("express");
const app = express();
const PORT = 3003;

const sequelize = require("./database/db.config");

const UserModel = require("./database/models/User");

const usersRoutes = require("./routes/users.routes");

app.use(express.json());

app.use("/api", usersRoutes);

const initializeDatabaseAndStartServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Połączenie z bazą danych (SQLite) zostało ustanowione pomyślnie."
    );

    await sequelize.sync({ alter: true });
    console.log(
      "Baza danych zsynchronizowana pomyślnie (tabela orders gotowa)."
    );

    app.listen(PORT, () => {
      console.log(`Serwis Users działa na http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Błąd inicjalizacji bazy danych lub serwera:", error);
    process.exit(1);
  }
};

initializeDatabaseAndStartServer();
