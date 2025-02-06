import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://aditi71:aditi71@cluster0.cdqc9.mongodb.net/zaika")
    // .connect("mongodb+srv://aditi71:aditi71@cluster0.5o0dg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB Connected"));
};
  