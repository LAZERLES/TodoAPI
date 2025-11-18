const Task = require('../Models/Task.js');

// Create a new task
const createTask = async (req,res) => {
    try {
        const { title, description, userId} = req.body;
        const newTask = await Task.create({ title,description,userId});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message } );
    }
}

const getTaskById = async (req,res) =>{
    try {
        const {id} = req.params;
        const task = await Task.findByPk(id);   
        if(!task){
            return res.status(404).json({ error: 'Task not found' } );
        } 
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message } );
    }
}

const updateTask = async (req, res) => {
    try {
        // Get the task ID from the URL
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.title = title;
        task.description = description;
        task.completed = completed;
        await task.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });        
    }
}

const deleteTask = async (req,res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({ error: 'Task not found' } );
        }
        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message } );
    }
}

module.exports = {createTask, getTasks, getTaskById, updateTask, deleteTask};