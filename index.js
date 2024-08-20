const express = require("express");
const mongoose = require("mongoose");
// const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");

// Import routes
const userRoutes = require("./routes/users");

// Config app
const app = express();
require("dotenv").config();

// Middlewares
app.use(express.json());
// app.use(expressValidator);

// use userRoutes like a middleware
app.use("/api/users", userRoutes);
app.use(cookieParser());

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
