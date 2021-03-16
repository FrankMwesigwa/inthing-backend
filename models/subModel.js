import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Category"},
  },
  { timestamps: true }
);

const Sub = mongoose.model("Sub", subSchema);

export default Sub;