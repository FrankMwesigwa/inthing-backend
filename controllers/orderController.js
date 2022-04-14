import Order from "../models/orderModel"
import SendSMS from '../config/SendSMS'

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ phonenumber: req.phonenumber })
  res.json(orders)
}

export const getOrders = async (req, res) => {
  const orders = await Order.find({})
  res.json(orders)
}

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)

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
    firstname,
    lastname,
    email,
    orderedBy,
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
    //const orderedBy = req.user.profile.phonenumber;
    //const orderedBy = '+256779825056';
    const order = new Order({
      orderItems,
      firstname,
      lastname,
      orderedBy,
      address,
      email,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      totalquantity
    })

    const phonenumber = ['+256779825056', '+256783992397', '+256786488258']

    {orderItems.length > 1 ? orderItems.map((order)=>(
      SendSMS(phonenumber, `${firstname} ${lastname} with phonenumber of ${orderedBy} Has placed a new order for ${order.title} at a cost of ${order.price} on inthing site`)
    )): SendSMS(phonenumber, `${firstname} ${lastname} with phonenumber of ${orderedBy} Has placed a new order for ${order.title} at a cost of ${order.price} on inthing site`)}

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