const mongoose = require("mongoose");

const userDetail = new mongoose.Schema(
  {
    rollNumber: { type: String, unique: true },
    fullName: String,
    email: String,
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", userDetail);
