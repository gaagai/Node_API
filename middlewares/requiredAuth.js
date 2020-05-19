const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: " Please sign in to access" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "asdkdj_jo_jk_adf3e34_secret", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: " Please sign in to access" });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
