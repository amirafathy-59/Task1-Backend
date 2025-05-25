import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customerId: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
