import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        title: { type: String },
        images: { type: String },
        price: { type: Number },
        discount: { type: Number },
        discountprice: { type: Number },
        quantity: { type: Number },
      },
    ],
    orderedBy: {
      type: String,
    },
    fullnames: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    totalquantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
