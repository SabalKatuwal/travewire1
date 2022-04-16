const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator')

const authController = require('../controllers/auth') //to go one directory back and go to controller/auth.js



// router.post('/tourist_register',authController.tourist_register)   

router.post('/tourist_register',[
    check('username', 'This username must me 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()
],authController.tourist_register)   





module.exports = router; 