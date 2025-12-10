// database/db.config.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "books.sqlite",
});

module.exports = sequelize;
