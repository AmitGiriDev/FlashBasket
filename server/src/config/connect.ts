import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.log("error in db connnection", error);
  }
};
