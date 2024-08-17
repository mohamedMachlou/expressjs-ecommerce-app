const express = require("express");
const mongoose = require("mongoose");
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
////////   Get Mathod  ////////////////////////////
///////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send({ message: "Working good ...." });
});

///////////////////////////////////////////////////
////////   Port and Listen     ////////////////////
///////////////////////////////////////////////////
const port = process.env.PORT | 7000;
app.listen(port, () => {
  console.log(`listen to this port : ${port}`);
});
