const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../Controller/Task.Controller.js');
const express = require('express');
const router = express.Router();

// Route to create a new task
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;