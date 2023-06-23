const express = require('express');
const loginController = require('../controllers/authController');

const router = express.Router();

router.put('/login',loginController);

module.exports= router;