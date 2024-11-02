import {
  confirmOrder,
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/order/order.ts";
import { verifyToken } from "../middlewares/auth.ts";

export const orderRoutes = async (fastify, options) => {
  fastify.addHook("preHandler", async (req, res) => {
    const isAuth = await verifyToken(req, res);
    if (!isAuth) {
      return res.code(404).send({
        message: "not auth",
      });
    }
  });
  fastify.post("/order", createOrder);
  fastify.get("/order", getOrders);
  fastify.get("/order/:orderId", getOrderById);
  fastify.patch("/order/:orderId/status", updateOrderStatus);
  fastify.post("/order/:orderId/confirm", confirmOrder);
};
