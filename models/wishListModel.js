import mongoose from "mongoose";

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const wishListSchema = schema(
  {
    title: {
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
    email: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", wishListSchema);

export default WishList;
