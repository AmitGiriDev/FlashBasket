import AdminJS from "adminjs";
import * as AdminJSMongoos from "@adminjs/mongoose";
import * as Models from "./../models/index.ts";
import { buildAuthenticatedRouter } from "@adminjs/fastify";

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
