const express = require('express');
const sequelize = require('./Data/DB');
const { configDotenv } = require('dotenv');
const User = require('./Models/User.js');
const Task = require('./Models/Task.js');
const UserRoutes = require('./Routes/User.routes.js');
const TaskRoutes = require('./Routes/Task.routes.js');
const cookieParser = require('cookie-parser');
configDotenv();


const app = express();

// middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Define associations
User.hasMany(Task, { foreignKey: 'userId'});
Task.belongsTo(User, { foreignKey: 'userId'});

// Define routes
app.use('/api/users', UserRoutes);
app.use('/api/tasks', TaskRoutes);


// Start the server
app.listen(3000, async () => {
    try {
        await sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
            sequelize.sync();
            console.log('Server is running on http://localhost:3000');
        })
    } catch (error) {
        console.error(error);
    }
})