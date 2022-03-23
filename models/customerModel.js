import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    phonenumber: {
      type: String,
    },
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
