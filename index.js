const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send({ message: "Working good ...." });
});

const port = process.env.PORT | 7000;
app.listen(port, () => {
  console.log(`listen to this port : ${port}`);
});
