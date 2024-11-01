import AdminJS from "adminjs";
import * as AdminJSMongoos from "@adminjs/mongoose";
import * as Models from "./../models/index.ts";
import { buildAuthenticatedRouter } from "@adminjs/fastify";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.ts";
import { dark, light, noSidebar } from "@adminjs/themes";

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
    {
      resource: Models.Product,
    },
    {
      resource: Models.Category,
    },
    {
      resource: Models.Order,
    },
    {
      resource: Models.Counter,
    },
  ],
  branding: {
    companyName: "FlashBasket",
    withMadeWithLove: false,
    favicon:
      "https://res.cloudinary.com/dujkryeb8/image/upload/v1730358860/hd4vymky6qgphlxuxalp.webp",
    logo: "https://res.cloudinary.com/dujkryeb8/image/upload/v1730358860/hd4vymky6qgphlxuxalp.webp",
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
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
