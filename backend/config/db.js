import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://aditi71:aditi71@cluster0.cdqc9.mongodb.net/zaika")
    .then(() => console.log("DB Connected"));
};
