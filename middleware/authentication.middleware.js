import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

// role -> user
export const isUser = async (req, res, next) => {
  //extract token from req.headers
  const authorization = req.headers.authorization;

  const splittedArray = authorization?.split(" ");

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  // if not token,throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // .......................//
  let payload;

  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    // decrypt token
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    //if decryption fails ,throw error
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // find user using email using payload
  const user = await User.findOne({ email: payload.email });
  console.log(user);
  // if not user  not found , throw error
  if (!user) {
    //!if user deletes the account from the DB
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // call next function
  next();
};

// role -> seller
export const isSeller = async (req, res, next) => {
  //extract token from req.headers
  const authorization = req.headers.authorization;

  const splittedArray = authorization?.split(" ");

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  // if not token,throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // .......................//
  let payload;

  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    // decrypt token
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    //if decryption fails ,throw error
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // find user using email using payload
  const user = await User.findOne({ email: payload.email });

  // if not user  not found , throw error
  if (!user) {
    //!if user deletes the account from the DB
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // check  user role ,if not seller, throw error
  if (user.role !== "seller") {
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // add user._id as user loggedInUserId
  req.loggedInUserId = user._id;

  // call next function
  next();
};

// role -> buyer
export const isBuyer = async (req, res, next) => {
  //extract token from req.headers
  const authorization = req.headers.authorization;

  const splittedArray = authorization?.split(" ");

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  // if not token,throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // .......................//
  let payload;

  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    // decrypt token
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    //if decryption fails ,throw error
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // find user using email using payload
  const user = await User.findOne({ email: payload.email });
  console.log(user);
  // if not user  not found , throw error
  if (!user) {
    //!if user deletes the account from the DB
    return res.status(401).send({ message: "Unauthorized..." });
  }

  //if user ,check the role if it is seller
  if (user.role !== "buyer") {
    return res.status(401).send({ message: "Unauthorized..." });
  }

  //passing user _id
  req.loggedInUser = user._id;

  // call next function
  next();
};
