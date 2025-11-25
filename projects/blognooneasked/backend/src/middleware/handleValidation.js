const { validationResult, matchedData } = require("express-validator");

module.exports = function handleValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }

  // Replace body, params, query with sanitized data
  req.validated = matchedData(req);

  next();
};
