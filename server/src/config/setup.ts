import AdminJS from "adminjs";
import * as AdminJSMongoos from "@adminjs/mongoose";

AdminJS.registerAdapter(AdminJSMongoos);

export const admin = new AdminJS({});
