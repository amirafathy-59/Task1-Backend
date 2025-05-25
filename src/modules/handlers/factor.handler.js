import { catchAsyncError } from "../../middleware/catchAsyncError.js"
import { AppError } from "../../utils/AppError.js"



export const deleteOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params
        let result = await model.findByIdAndDelete(id)

        !result && next(new AppError(`Record not found`), 404)
        result && res.status(200).json({ message: "successfully deleted", result })
    })
}