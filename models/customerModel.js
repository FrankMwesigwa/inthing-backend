import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    phonenumber: {
      type: String,
    },
    fullnames: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
