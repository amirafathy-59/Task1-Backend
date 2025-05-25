import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product Name is required"],
      minLength: [2, "too short product name"],
    },
    price: {
      type: Number,
      required: [true, "product price is required."],
     min: [0, 'Price must be a positive number']
    },
    description: {
      type: String,
      maxLength: [300, "too long product description"],
      required: [true, "product description required"],
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'stock must be a positive number'],
      required: [true, "product quantity is required"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);





export const productModel = mongoose.model("product", productSchema);
