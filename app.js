const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "hvme12#tyu7834?[]powqrdgty";

//Below is the steps to connect to the MongoDB Database
const mongoUrl = "mongodb://0.0.0.0:27017/hostleRegister";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server Started");
});

require("./userDetails");
const User = mongoose.model("UserInfo");

//To Register New User
app.post("/register", async (req, res) => {
  const { rollNumber, fullName, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ rollNumber });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      rollNumber,
      fullName,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// To Login in the websites
app.post("/login-user", async (req, res) => {
  const { rollNumber, password } = req.body;

  const user = await User.findOne({rollNumber});
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "OK", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "INVALID PASSWORD" });
});

//
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "OK", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
