const asyncHandler = require('express-async-handler');
const Menu = require('../models/menuModel');

// @desc Get all menu items
// @route GET /api/menus
// @access Private
const getMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.find({});
    res.json(menu);
});

// @desc Create a menu item
// @route POST /api/menus
// @access Private
const createMenuItem = asyncHandler(async (req, res) => {
    const { name, description, price, image, category } = req.body;

    if (!name || !description || !price || !image || !category) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const menuItem = await Menu.create({
        name,
        description,
        price,
        image,
        category,
    });
    res.status(201).json(menuItem);
});

// @desc Update a menu item
// @route PUT /api/menus/:id
// @access Private
const updateMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
        res.status(404);
        throw new Error('Menu item not found');
    }

    const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMenuItem);
});

// @desc Delete a menu item
// @route DELETE /api/menus/:id
// @access Private
const deleteMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
        res.status(404);
        throw new Error('Menu item not found');
    }

    await menuItem.remove();
    res.json({ message: 'Menu item removed' });
});

module.exports = {
    getMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};
