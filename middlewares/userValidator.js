// exports.userSignupValidator = (req, res, next) => {
//   req.check("name", "name is required").notEmpty();
//   req.check("email").isEmaik();
//   req
//     .check("password")
//     .notEmpty()
//     .isLength({ min: 8, max: 40 })
//     .withMessage("Password must between 8 and 40 caracters");

//   const errors = req.validationErrors();

//   if (errors) {
//     return res.status(400).json(errors);
//   }

//   next();
// };

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validate,
};
