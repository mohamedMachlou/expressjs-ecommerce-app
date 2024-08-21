const Category = require("../models/category");

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((category) => {
      res.json({ category: category });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "bad request, your category has not yet registred !!!",
      });
    });
};
