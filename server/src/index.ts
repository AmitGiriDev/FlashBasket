import dotenv from "dotenv";
import fastify from "fastify";
import { connectDB } from "./config/connect.js";

dotenv.config();
const PORT = 3000;

const start = async () => {
  const app = fastify();

  await connectDB(process.env.MONGO_URI);
  app.get("/", async function handler(request, reply) {
    return { hello: "world" };
  });

  app.listen({ port: PORT || 3000, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Flash basket server running");
    }
  });
};
start();
