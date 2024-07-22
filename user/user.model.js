import mongoose from "mongoose";

//set schema / rule / structure
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  role: {
    type: String,
  },
});

//create table /collection /model
const User = mongoose.model("User", userSchema);
export default User;
