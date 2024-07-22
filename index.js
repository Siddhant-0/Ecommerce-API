import express from "express";
import connectDB from "./database-connection/db.connect.js";
import { connect } from "mongoose";

const app = express();

// to make app understand json
app.use(express.json());

// TODO :enable course

//connect database
await connectDB();

//register routes

// TODO : handle global error

//network port and server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
