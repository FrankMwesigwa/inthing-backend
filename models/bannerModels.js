import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    bannername: {
      type: String,
    },
    images: {
      type: Array,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
