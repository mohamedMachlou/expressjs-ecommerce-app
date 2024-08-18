const express = require("express");
const router = express.Router();
const { salam, signup } = require("../controllers/userController");

// router.get("/", salam);

router.post("/signup", signup);

module.exports = router;
