import mongoose from "mongoose";
import { userTypeConstant } from "../types/index.ts";

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  liveLocation: {
    latitue: { type: Number },
    longitude: { type: Number },
  },
  address: {
    type: String,
  },
  deliveryPartners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: userTypeConstant.DeliveryPartner,
    },
  ],
});

export const Branch = mongoose.model("Branch", branchSchema);
