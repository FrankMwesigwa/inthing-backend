import mongoose from "mongoose";

const sellersSchema = mongoose.Schema(
  {
    fullnames: {
      type: String,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    business: {
      type: String,
    },
    location: {
      type: String,
    },
    items: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Sellers = mongoose.model("Sellers", sellersSchema);

export default Sellers;
