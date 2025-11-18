const { DataTypes } = require('sequelize');
const sequelize = require('../Data/DB');

const Task = sequelize.define('Task', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    completed:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Task;