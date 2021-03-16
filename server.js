import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/cloundinaryRoutes'
import categoryRoutes from './routes/categoryRoutes';
import subRoutes from './routes/subRoute';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import smsRoutes from './routes/smsRoutes';
import accessoryRoutes from './routes/accessoryRoutes';

dotenv.config()

connectDB()

const app = express()
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));
app.use('/public', express.static(path.join(__dirname, 'uploads')));


app.use('/api/category', categoryRoutes)
app.use('/api/subs', subRoutes)
app.use('/api/product', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/otp', smsRoutes)
app.use('/api/accessory', accessoryRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)