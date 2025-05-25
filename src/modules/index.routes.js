import { globalErrorHandling } from "../middleware/globalErrorHandling.js"
import { AppError } from "../utils/AppError.js"
import orderRouter from "./order/order.router.js"
import productRouter from "./product/product.router.js"
// import userRouter from "./user/user.router.js"

export function init(app) {

   app.use('/api/v1/products', productRouter)
    //app.use('/api/v1/users', userRouter)
    app.use('/api/v1/orders', orderRouter)
//     app.all('*', (req, res, next) => {
//         next(new AppError(`can't find this route: ${req.originalUrl}`), 404)
//     })
//     //global error handling middleware
//     app.use(globalErrorHandling)
}