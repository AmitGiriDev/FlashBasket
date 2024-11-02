import { authRoutes } from "./auth.ts";
import { orderRoutes } from "./order.ts";
import { categoryRoutes, productRoutes } from "./products.ts";

const prefix = "/api";

export const registerRoutes = async (fastify) => {
  fastify.register(authRoutes, { prefix: prefix });
  fastify.register(productRoutes, { prefix: prefix });
  fastify.register(categoryRoutes, { prefix: prefix });
  fastify.register(orderRoutes, { prefix: prefix });
};
