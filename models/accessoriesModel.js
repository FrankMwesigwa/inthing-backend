import mongoose from "mongoose";

const accessoriesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
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
    brand: { type: String},
    color: { type: String},
    discount: {
        type: Number,
        trim: true,
      },
    price: {
        type: Number,
        trim: true,
    },
    discountprice: {
        type: Number,
        trim: true,
    },
    images: {
        type: Array,
    },
    specs: {
        type: [String]
      },
  },
  { timestamps: true }
);

const Accessories = mongoose.model("Accessories", accessoriesSchema);

export default Accessories;