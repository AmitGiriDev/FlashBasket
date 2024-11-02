import {
  fetchUser,
  genRefreshToken,
  loginCustomer,
  loginDeliveryPartner,
} from "../controllers/auth/auth.ts";
import { updateUser } from "../controllers/tracking/user.ts";
import { verifyToken } from "../middlewares/auth.ts";

export const authRoutes = async (fastify, options) => {
  fastify.post("/customer/login", loginCustomer);
  fastify.post("/delivery/login", loginDeliveryPartner);
  fastify.post("/refresh-token", genRefreshToken);
  fastify.get("/user", { preHandler: [verifyToken] }, fetchUser);
  fastify.patch("/user", { preHandler: [verifyToken] }, updateUser);
};
