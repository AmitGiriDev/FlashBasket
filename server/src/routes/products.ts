import { getAllCategories } from "../controllers/product/category.ts";
import { getProductsByCategories } from "../controllers/product/product.ts";

export const productRoutes = async (fastify, options) => {
  fastify.get("/products/:categoryId", getProductsByCategories);
};

export const categoryRoutes = async (fastify, options) => {
  fastify.get("/categories", getAllCategories);
};
