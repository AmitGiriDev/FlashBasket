import mongoose from "mongoose";
import { tableName } from "../types/index.ts";
import Counter from "./counter.ts";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: tableName.Customer,
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: tableName.Branch,
    required: true,
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: tableName.DeliveryPartner,
    required: true,
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: tableName.Product,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: tableName.Product,
      },
      count: { type: Number, required: true },
    },
  ],
  deliveryLocation: {
    lattitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  pickupLocation: {
    lattitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  deliveryPartnerLocation: {
    lattitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  status: {
    type: String,
    enum: ["available", "confirmed", "arriving", "delivered", "cancelled"],
    default: "available",
  },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

async function getNextSequenceValue(sequenceName: String) {
  const sequenceObj = await Counter.findOneAndUpdate(
    {
      name: sequenceName,
    },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceObj.sequence_value;
}

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const sequenceValue = await getNextSequenceValue("orderId");
    this.orderId = `ORDER${sequenceValue.toString().padStart(5, "0")}`;
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
