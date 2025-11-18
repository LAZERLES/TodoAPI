const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../Controller/Task.Controller.js');
const authenticateToken = require('../Middleware/auth.js');
const express = require('express');
const router = express.Router();

// Route to create a new task
router.post('/create',authenticateToken, createTask);
router.get('/',authenticateToken, getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;