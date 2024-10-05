import mongoose from "mongoose";

//set schema

const cartSchema = new mongoose.Schema({
  buyerId: mongoose.ObjectId,
  productId: mongoose.ObjectId,
  orderedQuantity: Number,
});

//create model
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
