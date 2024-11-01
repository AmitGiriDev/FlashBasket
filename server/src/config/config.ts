import "dotenv/config.js";
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";

import { Admin } from "../models/user.ts";
import { Error } from "mongoose";

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  Collection: "session,",
});

sessionStore.on("error", (error: Error) => {
  console.log(error);
});

export const authenticate = async (email: string, password: string) => {
  if (email && password) {
    const user = await Admin.findOne({ email: email });
    if (!user) {
      return null;
    }
    if (user?.password === password) {
      return Promise.resolve({ email: email, password: password });
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD || "";
