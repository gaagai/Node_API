const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "asdkdj_jo_jk_adf3e34_secret");
    res.send({ token });
  } catch (error) {
    console.log(error);
    return res.status(422).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Please provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "asdkdj_jo_jk_adf3e34_secret");
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
