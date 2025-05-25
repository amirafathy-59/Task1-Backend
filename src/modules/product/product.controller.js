import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.handler.js";
import { productModel } from "../../../DB/models/product.model.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

// add product
export const createProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, price, stock } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and Description are required." });
  }

  if (price < 0 || stock < 0) {
    return res
      .status(400)
      .json({ message: "Price and Stock must be non-negative numbers." });
  }
  try {
    const newProduct = new productModel({ name, description, price, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get all products
 export const getAllProducts = catchAsyncError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  const products = await apiFeatures.mongooseQuery;

  res
    .status(200)
    .json({ message: "success", page: apiFeatures.page, products });
});
// get specific product
export const getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let result = await productModel.findById(id);

  !result && next(new AppError(`Product not found`), 404);
  result && res.status(200).json({ message: "success", result });
});
// update product
export const updateProduct = catchAsyncError(async (req, res, next) => {
  const { name, description, price, stock } = req.body;
  const { id } = req.params;

  if (price < 0 || stock < 0) {
    return res
      .status(400)
      .json({ message: "Price and Stock must be non-negative numbers." });
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock },
      { new: true, runValidators: true }
    );

    !updatedProduct && next(new AppError(`Product not found`), 404);
    updatedProduct && res.status(200).json({ message: "success", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// delete product
export const deleteProduct = deleteOne(productModel);
