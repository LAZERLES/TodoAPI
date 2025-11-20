const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
require("dotenv").config();

let sequelize;

// Database connection setup
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT || "mysql",
    }
  );
}

module.exports = sequelize;