import AdminJS from "adminjs";
import * as AdminJSMongoos from "@adminjs/mongoose";
import * as Models from "./../models/index.ts";
import { buildAuthenticatedRouter } from "@adminjs/fastify";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.ts";

AdminJS.registerAdapter(AdminJSMongoos);

export const admin = new AdminJS({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["phone", "role", "isActivated"],
        filterProperties: ["phone", "role"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Branch,
    },
  ],
  branding: {
    companyName: "FlashBasket",
    withMadeWithLove: true,
  },
  rootPath: "/admin",
});

export const buildAdmiRouter = async (app) => {
  await buildAuthenticatedRouter(
    admin,
    {
      authenticate: authenticate,
      cookiePassword: COOKIE_PASSWORD,
      cookieName: "adminjs",
    },
    app,
    {
      store: sessionStore,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
    }
  );
};
