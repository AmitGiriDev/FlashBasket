import dotenv from "dotenv";
import fastify from "fastify";
import { connectDB } from "./config/connect.js";
import { MONGO_URI, PORT } from "./config/config.ts";
import { admin, buildAdmiRouter } from "./config/setup.ts";
import { registerRoutes } from "./routes/index.ts";
import fastifySocketIO from "fastify-socket.io";

dotenv.config();

const start = async () => {
  await connectDB(MONGO_URI || "");
  const app = fastify();

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });
  await buildAdmiRouter(app);

  await registerRoutes(app);

  app.listen({ port: PORT,host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Flash basket server running on http://localhost:${PORT}${admin.options.rootPath}`
      );
    }
  });

  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("user connected");

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log("orderId", orderId);
      });

      socket.on("disconnect", () => {});
    });
  });
};
start();
