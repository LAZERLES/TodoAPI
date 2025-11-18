const {createUser} = require('../Controller/User.Controller.js');

const express = require('express');
const router = express.Router();
// Route to create a new user
router.post('/users', createUser);

module.exports = router;