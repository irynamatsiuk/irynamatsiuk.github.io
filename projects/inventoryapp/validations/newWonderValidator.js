const { body, validationResult } = require("express-validator");

const lengthErr = "Wonder's name must be between 2 and 50 characters";

const newWonderValidationRules = [
  body("name").trim().isLength({ min: 2, max: 50 }).withMessage(lengthErr),
];

const validateNewWonder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("newWonder", { title: "New Wonder", errors: errors.array() });
  }
  next();
};

module.exports = {
  newWonderValidationRules,
  validateNewWonder,
};
