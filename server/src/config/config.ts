import "dotenv/config.js";
import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";

import { Admin } from "../models/user.ts";

const MongoDBStore = ConnectMongoDBSession(fastifySession);
