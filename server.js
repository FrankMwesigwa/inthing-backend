import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import imageRoutes from './routes/imageRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subRoutes from './routes/subRoute';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import smsRoutes from './routes/smsRoutes';
import wishRoutes from './routes/wishListRoutes';
import accessoryRoutes from './routes/accessoryRoutes';

dotenv.config()

connectDB()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use("/api/uploads", express.static(__dirname + '/public'));

app.use('/api/category', categoryRoutes)
app.use('/api/brand', subRoutes)
app.use('/api/product', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', imageRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/otp', smsRoutes)
app.use('/api/wishlist', wishRoutes)
app.use('/api/accessory', accessoryRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)