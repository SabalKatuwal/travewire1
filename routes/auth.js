const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth') //to go one directory back and go to controller/auth.js

router.post('/tourist_register',authController.tourist_register)   

module.exports = router; 