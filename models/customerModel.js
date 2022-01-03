import mongoose from 'mongoose'

const customerSchema = mongoose.Schema(
  {
    phonenumber: {
      type: String
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default:'customer'
  },
  },
  {
    timestamps: true,
  }
)

const Customer = mongoose.model('Customer', customerSchema)

export default Customer
