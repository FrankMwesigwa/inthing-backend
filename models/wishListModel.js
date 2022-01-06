import mongoose from "mongoose";

const wishListSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
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
