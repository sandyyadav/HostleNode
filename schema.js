const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, unique: true },
    Name: String,
    email: String,
    password: String,
  },
  {
    collection: "UserInfo",
  }
);

const adminSchema = new mongoose.Schema(
  {
    adminId: { type: String, unique: true },
    adminPassword: String,
  },
  {
    collection: "adminData",
  }
);
const profileSchema = new mongoose.Schema(
  {
    rollnumber:{type:String,unique: true},
    department:String,
    year:String,
    contactNumber:String,
    bloodGroup:String,
    fatherName:String,
    motherName:String,
    parentsMobileNumber:String,
    address:String,
    image:String,
    DOB:String
  },
  {
    collection:"profile"
  }
)
const UserDetail = mongoose.model("UserInfo", userSchema);
const AdminDetail = mongoose.model("adminData", adminSchema);
const ProfileDetails=mongoose.model("profile",profileSchema);

module.exports = {
  UserDetail,
  AdminDetail,
  ProfileDetails,
};
