const express = require("express");
const mongoose = require("mongoose");
// const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categoriesRoutes");

// Config app
require("dotenv").config();
const app = express();

// Middlewares
app.use(express.json());
// app.use(expressValidator);

// use userRoutes like a middleware
app.use("/api", authRoutes);
app.use(cookieParser());
app.use("/api", userRoutes);
app.use("/api/category", categoryRoutes);

/// Use mongoose
const db = process.env.DATABASE;
mongoose
  .connect(db)
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("database not  connect");
  });

///////////////////////////////////////////////////
////////   Port and Listen     ////////////////////
///////////////////////////////////////////////////
const port = process.env.PORT | 7000;
app.listen(port, () => {
  console.log(`listen to this port : ${port}`);
});
