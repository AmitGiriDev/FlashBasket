import mongoose from "mongoose";
import { userTypeConstant } from "../types/index.js";

// base user schema

const userSchema = new mongoose.Schema({
  name: { type: String },
  role: {
    type: String,
    enum: [
      userTypeConstant.Customer,
      userTypeConstant.Admin,
      userTypeConstant.DeliveryPartner,
    ],
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

const customerSchema = new mongoose.Schema({
  ...userSchema.obj,
  phone: { type: Number, required: true, unique: true },
  role: {
    type: String,
    enum: [userTypeConstant.Customer],
    default: "Customer",
  },
  liveLocation: {
    latitue: { type: Number },
    longitude: { type: Number },
  },
  address: {
    type: String,
  },
});

const deliveryPartnerSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: "true" },
  phone: { type: Number, required: true },
  role: {
    type: String,
    enum: [userTypeConstant.DeliveryPartner],
    default: userTypeConstant.DeliveryPartner,
  },
  liveLocation: {
    latitue: { type: Number },
    longitude: { type: Number },
  },
  address: {
    type: String,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

const adminSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: "true" },

  role: {
    type: String,
    enum: [userTypeConstant.Admin],
    default: userTypeConstant.Admin,
  },
});

export const Customer = mongoose.model(
  userTypeConstant.Customer,
  customerSchema
);
export const Admin = mongoose.model(userTypeConstant.Admin, adminSchema);
export const DeliveryPartner = mongoose.model(
  userTypeConstant.DeliveryPartner,
  deliveryPartnerSchema
);
