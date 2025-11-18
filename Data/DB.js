const { Sequelize } = require("sequelize");
const mysql = require("mysql2");

// Database connection setup
const sequelize = new Sequelize("td_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;