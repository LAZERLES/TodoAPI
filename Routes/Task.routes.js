const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../Controller/Task.Controller.js');
const authenticateToken = require('../Middleware/auth.js');
const express = require('express');
const router = express.Router();

// Route to create a new task
router.post('/create', authenticateToken, createTask);
router.get('/', authenticateToken, getTasks);
router.get('/task/:id', authenticateToken ,getTaskById);
router.put('/update/:id', authenticateToken, updateTask);
router.delete('/delete/:id', authenticateToken, deleteTask);

module.exports = router;