const { registerUser, loginUser} = require('../Controller/User.Controller.js');


const express = require('express');
const router = express.Router();
// Route to create a new user
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;