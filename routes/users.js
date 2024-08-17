const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("users module");
});

module.exports = router;
