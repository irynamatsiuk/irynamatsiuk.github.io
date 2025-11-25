const { body } = require("express-validator");

const emptyErr = "cannot be empty";

const validateComment = [
  body("postId").notEmpty().isUUID().withMessage("Invalid post ID"),
  body("content").trim().notEmpty().withMessage(`Comment ${emptyErr}`).escape(),
];

module.exports = validateComment;
