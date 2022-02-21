import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    category: { type: ObjectId, ref: "Category"},
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;