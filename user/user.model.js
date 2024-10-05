import mongoose from "mongoose";

//set schema / rule / structure
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ["male", "female", "other"],
  },
  role: {
    type: String,
    required: true,
    enum: ["buyer", "seller"],
    trim: true,
  },
});
userSchema.methods.toJSON = function () {
  let obj = this.toObject(); //or var obj = this;
  delete obj.password;
  return obj;
};

//create table /collection /model
const User = mongoose.model("User", userSchema);
export default User;
