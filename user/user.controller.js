import express from "express";

import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  loginUserValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import validateReqBody from "../middleware/validate.req.body.js";

const router = express.Router();

//? Register user
router.post(
  "/user/register",
  async (req, res, next) => {
    //extract data from req.body
    const data = req.body;

    /// validate data

    try {
      const validatedData = await userValidationSchema.validate(data);
      req.body = validatedData;
    } catch (error) {
      // if validation fails ,throw error
      return res.status(400).send({ message: error.message });
    }

    // call next function
    next();
  },

  async (req, res) => {
    //extract new user rom req.body
    const newUser = req.body;

    // find user using email
    const user = await User.findOne({ email: newUser.email });

    // if user exists , throw error
    if (user) {
      return res.status(409).send({ message: "Emails already exists..." });
    }

    //hash password

    const saltRound = 10;
    const plainPassword = newUser.password;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

    // insert the hashed password
    newUser.password = hashedPassword;

    // insert user
    await User.create(newUser);

    // send response
    return res
      .status(201)
      .send({ message: "User is registered successfully..." });
  }
);

//? login

router.post(
  "/user/login",
  validateReqBody(loginUserValidationSchema), //! using function factory in middleware for validation of the Schema
  async (req, res) => {
    // extract login credentials from m req.body
    const loginCredentials = req.body;

    // find user using email
    const user = await User.findOne({ email: loginCredentials.email });

    //if not user , throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials..." });
    }

    // compare password using bcrypt
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;

    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    // if not match password ,throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials..." });
    }

    // generate access token
    const payload = { email: user.email };
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const token = await jwt.sign(payload, secretKey);

    //send response
    return res.status(200).send({
      message: "Login Successful...",
      userDetails: user,
      accessToken: token,
    });
  }
);

export default router;
