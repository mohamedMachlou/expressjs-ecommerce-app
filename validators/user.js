const { body } = require("express-validator");

const signupValidationRules = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .not()
      .isEmpty()
      .withMessage("Name is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .not()
      .isEmpty()
      .withMessage("Password is required"),
  ];
};

module.exports = {
  signupValidationRules,
};
