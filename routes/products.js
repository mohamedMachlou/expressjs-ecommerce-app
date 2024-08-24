const express = require("express");
const router = express.Router();

const {
  createProduct,
  showProductById,
  removeProduct,
  updateProduct,
} = require("../controllers/productController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const { userById } = require("../middlewares/user");
const { getProductById } = require("../middlewares/product");

router.post("/create/:userId", [requireSignIn, isAuth, isAdmin], createProduct);
router.get("/:productId", showProductById);
router.delete("/:productId", removeProduct);
router.put("/:productId", updateProduct);

router.param("userId", userById);
router.param("productId", getProductById);

module.exports = router;
