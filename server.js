require("./models/User");
const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

app.use(express.json({ extended: false }));
app.use(authRoutes);

//Connect DB
connectDB();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port: ${port} - ${process.env.NODE_ENV}`);
});
