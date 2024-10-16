import dotenv from "dotenv";
import fastify from "fastify";
dotenv.config();
const PORT = 5000;

const start = async () => {
  const app = fastify();

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
