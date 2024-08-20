const express = require("express");
const router = express.Router();
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");

const { getOneUser } = require("../controllers/userController");
const { userById } = require("../middlewares/user");

router.get("/profile/:userId", requireSignIn, isAuth, getOneUser);

router.param("userId", userById);

module.exports = router;
