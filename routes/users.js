const express = require("express");
const router = express.Router();
const { salam, signup, signin } = require("../controllers/userController");
// const { userSignupValidator } = require("../middlewares/userValidator");
const { signupValidationRules } = require("../validators/user");
const { validate } = require("../middlewares/userValidator");

// router.get("/", salam);

router.post("/signup", signupValidationRules(), validate, signup);
router.post("/signin", signin);

module.exports = router;
