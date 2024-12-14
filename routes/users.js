const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).send(user);
});

// User login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } });
    if (user) {
        res.send(user);
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;