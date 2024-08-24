const Product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.json({
          error: "Product Not Found",
        });
      }
      (req.product = product), next();
    })
    .catch((err) => {
      if (err) {
        return res.json({
          error: "Product Not Found",
        });
      }
    });
};
