import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      text: true,
    },
    manname: {
      type: String,
    },
    manbrand: {
      type: String,
    },
    price: {
      type: Number,
      trim: true,
    },
    discount: {
      type: Number,
      trim: true,
    },
    discountprice: {
      type: Number,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: {
      type: ObjectId,
      ref: "Brand",
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
    },
    specifications: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
