const express = require('express');
const router = express.Router();
const { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const validateToken = require('../middleware/validateTokenHandler');
const checkRole = require('../middleware/roleMiddleware');


router.use(validateToken);
router.route("/").get(getMenu).post(checkRole('admin'), createMenuItem);
router.route("/:id").put(checkRole('admin'), updateMenuItem).delete(checkRole('admin'), deleteMenuItem);

module.exports = router;