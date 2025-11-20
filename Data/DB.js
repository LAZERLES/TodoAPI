const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
require('dotenv').config();

// Database connection setup
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});

module.exports = sequelize;