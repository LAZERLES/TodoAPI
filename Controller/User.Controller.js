const User = require('../Models/User.js');

// Create a new user
const createUser = async (req,res) => { 
    try {
        const { username, password} = req.body;
        const newUser = await User.create({ username,password});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'} );
        
    }
}

module.exports = {createUser};