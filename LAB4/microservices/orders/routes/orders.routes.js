const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders.controller");
const { verifyToken } = require("../../shared/middleware/auth.middleware");

router.get("/orders/:userId", orderController.getUserOrders);

router.post("/orders", verifyToken, orderController.createOrder);

router.delete("/orders/:orderId", verifyToken, orderController.deleteOrder);

router.patch(
  "/orders/:orderId",
  verifyToken,
  orderController.updateOrderPartial
);

module.exports = router;
