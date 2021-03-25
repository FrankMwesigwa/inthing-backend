import Order from "../models/orderModel"
// import SendSMS from '../config/sendSMS'

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ phonenumber: req.phonenumber })
  res.json(orders)
}

export const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user')
  res.json(orders)
}

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

export const createOrder = async (req, res) => {
  const {
    orderItems,
    address,
    name,
    contact,
    email,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    totalquantity
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    // const orderedBy = req.user.profile.phonenumber;
    const order = new Order({
      orderItems,
      // orderedBy,
      address,
      name,
      contact,
      email,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      totalquantity
    })

    const phonenumber = ['+256706652079', '+256751290264']

    // {orderItems.length > 1 ? orderItems.map((order)=>(
    //   SendSMS(phonenumber, `New orders For ${order.title} at a cost of ${order.price} from ${orderedBy} has been placed`)
    // )): SendSMS(phonenumber, `A New order For ${orderItems.title} at a cost of ${totalPrice} from ${orderedBy} has been placed`)}

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
}

export const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

export const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}