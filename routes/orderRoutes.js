const express = require('express');
const router = express.Router();
const { getOrders, createOrder, getOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const validateToken = require('../middleware/validateTokenHandler');
const checkRole = require('../middleware/roleMiddleware');

router.use(validateToken);
router.route("/").get(checkRole('admin'), getOrders).post(createOrder);
router.route('/:id').get(checkRole('admin'), getOrder).put(checkRole('admin'), updateOrder).delete(checkRole('admin'), deleteOrder);

module.exports = router;