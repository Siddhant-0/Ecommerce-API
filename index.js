import express from "express";
import connectDB from "./database-connection/db.connect.js";
import userRoutes from "./user/user.controller.js";
import productRoutes from "./product/product.controller.js";

const app = express();

// to make app understand json
app.use(express.json());

// TODO :enable course

//connect database
await connectDB();

//register routes
app.use(userRoutes);
app.use(productRoutes);

// TODO : handle global error

//network port and server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
