const express = require('express');
const sequelize = require('./Data/DB');
require('dotenv').config();
const User = require('./Models/User.js');
const Task = require('./Models/Task.js');
const UserRoutes = require('./Routes/User.routes.js');
const TaskRoutes = require('./Routes/Task.routes.js');
const cookieParser = require('cookie-parser');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./Config/swagger.js');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Task API Documentation'
}));


// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Define associations
User.hasMany(Task, { foreignKey: 'userId'});
Task.belongsTo(User, { foreignKey: 'userId'});

// Define routes
app.use('/api/users', UserRoutes);
app.use('/api/tasks', TaskRoutes);


// Start the server
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connection established');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT , () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    });