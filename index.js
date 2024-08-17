const express = require("express");
const mongoose = require("mongoose");

// Import routes
const userRoutes = require("./routes/users");

// use userRoutes like a middleware
app.use("/api/users", userRoutes);

// Config app
const app = express();
require("dotenv").config();

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
