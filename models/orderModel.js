import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        prodid: { type: String},
        title: { type: String},
        images: { type: String},
        price: { type: Number},
        discount: { type: Number},
        discountprice: { type: Number},
        countInStock: { type: Number},
        storageSize: { type: String},
        storagePrice: { type: Number},
        color: { type: String}
      },
    ],
    orderedBy: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    taxPrice: {
      type: Number,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order