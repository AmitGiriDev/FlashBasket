import dotenv from "dotenv";
import fastify from "fastify";
import { connectDB } from "./config/connect.js";
import { PORT } from "./config/config.ts";
import { admin, buildAdmiRouter } from "./config/setup.ts";

dotenv.config();

const start = async () => {
  await connectDB(process.env.MONGO_URI || "");
  const app = fastify();

  await buildAdmiRouter(app);

  app.get("/", async function handler(request, reply) {
    return { hello: "world" };
  });

  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Flash basket server running on http://localhost:${PORT}${admin.options.rootPath}`
      );
    }
  });
};
start();
