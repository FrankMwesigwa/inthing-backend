import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
