
import express from "express"
import * as product from "./product.controller.js"

const productRouter = express.Router()
productRouter
    .route('/')
    .post(product.createProduct)
    .get(product.getAllProducts)

productRouter
    .route('/:id')
    .get(product.getProduct)
    .put(product.updateProduct)
    .delete(product.deleteProduct)


export default productRouter


