const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

// @desc Get all orders
// @route GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});

// @desc Create an order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, tableNumber, totalAmount } = req.body;

    if (!orderItems || !tableNumber || !totalAmount) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const order = await Order.create({
        orderItems,
        tableNumber,
        totalAmount,
    });
    res.status(201).json(order);
});

// @desc Get an order
// @route GET /api/orders/:id
// @access Private
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    res.json(order);
});

// @desc Update an order
// @route PUT /api/orders/:id
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
});

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    await order.remove();
    res.json({ message: 'Order removed' });
});

module.exports = { getOrders, createOrder, getOrder, updateOrder, deleteOrder };