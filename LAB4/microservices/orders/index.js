const express = require("express");
const app = express();
const PORT = 3002;

const sequelize = require("./database/db.config");

const OrderModel = require("./database/models/Order");

const orderRoutes = require("./routes/orders.routes");

app.use(express.json());

app.use("/api", orderRoutes);

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
      console.log(`Serwis Orders działa na http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Błąd inicjalizacji bazy danych lub serwera:", error);
    process.exit(1);
  }
};

initializeDatabaseAndStartServer();
