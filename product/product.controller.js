import express from "express";
import Product from "./product.model.js";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

import { isSeller, isUser } from "../middleware/authentication.middleware.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { addProductValidationSchema } from "./product.validation.js";
const router = express.Router();

//? API list all product
router.get("/product/list", isUser, async (req, res) => {
  // find all products
  const products = await Product.find();

  //return response
  return res.status(200).send({ message: "Success", productList: products });
});

//? API add product
router.post(
  "/product/add",
  isSeller,
  validateReqBody(addProductValidationSchema),
  async (req, res) => {
    //extract new product to be entered using req.body
    const newProduct = req.body;

    newProduct.sellerId = req.loggedInUserId;

    //input the data in the DB /save product
    await Product.create(newProduct);

    //send response
    return res
      .status(201)
      .send({ message: "Product is added successfully..." });
  }
);

export default router;
