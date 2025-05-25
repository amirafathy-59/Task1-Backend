import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { productModel } from "../../../DB/models/product.model.js";
import { orderModel } from "../../../DB/models/order.model.js";
import { deleteOne } from "../handlers/factor.handler.js";

// GET /api/orders
export const getAllOrders = async (req, res) => {
  const orders = await orderModel.find().populate("products");
  res.json(orders);
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const order = await orderModel.findById(req.params.id).populate("products");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

// POST /api/orders

export const createOrder = async (req, res) => {
  const { customerId, products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ message: "Products must be a non-empty array." });
  }

  let totalAmount = 0;
  const updatedProducts = [];

  for (const item of products) {
    // Check if quantity is positive
    if (item.quantity <= 0) {
      return res
        .status(400)
        .json({
          message: `Quantity must be greater than 0 for product ${item.productId}`,
        });
    }
    const product = await productModel.findById(item.productId);
    if (!product) {
      return res
        .status(400)
        .json({ message: `Product not found: ${item.productId}` });
    }
    //  Validate non-negative stock
    if (item.quantity > product.stock) {
      return res.status(400).json({
        message: `Not enough stock for "${product.name}". Requested: ${item.quantity}, Available: ${product.stock}`,
      });
    }
    totalAmount += product.price * item.quantity;
    updatedProducts.push({
      productId: product._id,
      quantity: item.quantity,
      newStock: product.stock - item.quantity,
    });
  }
  const order = await orderModel.create({ customerId, products, totalAmount });
  for (const item of updatedProducts) {
    await productModel.findByIdAndUpdate(item.productId, {
      stock: item.newStock,
    });
  }
  res.status(201).json(order);
};

// PUT /api/orders/:id
export const updateOrder = async (req, res) => {
  const { customerId, products } = req.body;
  let updatedProducts = [];

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({
        message: "Products are required and must be a non-empty array.",
      });
  }

  let totalAmount = 0;

  // Recalculate totalAmount from new product list
  for (const item of products) {
    // Check if quantity is positive
    if (item.quantity <= 0) {
      return res
        .status(400)
        .json({
          message: `Quantity must be greater than 0 for product ${item.productId}`,
        });
    }
    const product = await productModel.findById(item.productId);
    if (!product)
      return res
        .status(400)
        .json({ message: `Invalid product ID: ${item.productId}` });

    //  Validate non-negative stock
    if (item.quantity > product.stock) {
      return res.status(400).json({
        message: `Not enough stock for "${product.name}". Requested: ${item.quantity}, Available: ${product.stock}`,
      });
    }

    totalAmount += product.price * item.quantity;
    
    updatedProducts.push({
      productId: product._id,
      quantity: item.quantity,
      newStock: product.stock - item.quantity,
    });
  }
  const updatedOrder = await orderModel.findByIdAndUpdate(
    req.params.id,
    { customerId, products, totalAmount },
    { new: true }
  );

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found" });
  }

  for (const item of updatedProducts) {
    await productModel.findByIdAndUpdate(item.productId, {
      stock: item.newStock,
    });
  }

  res.status(200).json(updatedOrder);
};

// DELETE /api/orders/:id
export const deleteOrder = deleteOne(orderModel);
