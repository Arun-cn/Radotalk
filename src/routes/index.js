const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoute.js');

// Use version tags, for example, "/v1/users"
router.use('/v1/auth', authRoutes);

module.exports = router;
