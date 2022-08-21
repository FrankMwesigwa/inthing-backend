import express from 'express'
const router = express.Router()
import {
  getOrders,
  createOrder,
  getOrderById
} from '../controllers/orderController.js'

import {auth} from '../middleware/authMiddleware.js'

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router
