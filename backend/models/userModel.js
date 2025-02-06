import mongoose, { trusted } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: trusted,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default:{}
  }
},{minimize: false}); // minimize false cuz we have not create type there only obj

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
