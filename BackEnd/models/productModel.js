import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  nutrition: {
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    protein: { type: Number, required: true },
    salt: { type: String, required: true },
  },

  storage: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },

  price_id: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
