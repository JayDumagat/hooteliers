const { body } = require("express-validator");

const registerValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),

  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

module.exports = {
  registerValidation,
};
