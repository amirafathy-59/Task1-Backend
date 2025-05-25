
import express from "express"
import * as order from "./order.controller.js"
const orderRouter = express.Router()

orderRouter
    .route('/')
    .post(order.createOrder)
    .get(order.getAllOrders)

orderRouter
    .route('/:id')
    .get(order.getOrderById)
    .put(order.updateOrder)
    .delete(order.deleteOrder)





export default orderRouter


