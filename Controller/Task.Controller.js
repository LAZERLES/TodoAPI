const Task = require('../Models/Task.js');

// Create a new task
const createTask = async (req,res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        // Validate input
        if(!title){
            return res.status(400).json({ error: 'Title is required' });
        }

        // Create task
        const newTask = await Task.create({ title, description: description || '', userId});
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

// Get all tasks for authenticated user
const getTasks = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware
        
        // Only get tasks belonging to this user
        const tasks = await Task.findAll({
            where: { userId },
            order: [['id', 'DESC']]
        });
        
        res.status(200).json({ task : tasks });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

// Get single task by ID with ownership check
const getTaskById = async (req,res) =>{
    try {
        const {id} = req.params;
        const userId = req.user.id;
        
        const task = await Task.findOne({
            where:{
                id, userId
            }
        });   

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
        const userId = req.user.id;

        // Find the task to update
        const { title, description, completed } = req.body;
        const task = await Task.findOne({
            where: { id, userId }
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Validate input - at least one field must be provided
        if (title === undefined && description === undefined && completed === undefined) {
            return res.status(400).json({ error: 'At least one field must be provided for update' });
        }

        // Update task details (only if provided)
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;

        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });        
    }
}

const deleteTask = async (req,res) => {
    try {
        
        const {id} = req.params;
        const userId = req.user.id;
        
        const task = await Task.findOne({
            where: { id, userId }
        })

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