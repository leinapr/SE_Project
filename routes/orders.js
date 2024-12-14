const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    const order = await Order.create(req.body);
    res.status(201).send(order);
});

// Get orders for a user
router.get('/:userId', async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.send(orders);
});

module.exports = router;