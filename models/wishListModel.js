import mongoose from "mongoose";

const wishListSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    price: {
      type: Number,
    },
    images: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", wishListSchema);

export default WishList;
