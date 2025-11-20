const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
require('dotenv').config();

// Database connection setup
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
});

module.exports = sequelize;