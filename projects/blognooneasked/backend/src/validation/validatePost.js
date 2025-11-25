const { body, param } = require("express-validator");

const emptyErr = "cannot be empty";

const validatePostBody = [
  body("title").trim().notEmpty().withMessage(`Title ${emptyErr}`).escape(),

  body("content")
    .trim()
    .notEmpty()
    .withMessage(`Post text ${emptyErr}`)
    .escape(),

  body("published")
    .isBoolean()
    .withMessage("isPublished must be true or false")
    .toBoolean(),
];

const validatePostId = [
  param("postId").isUUID().withMessage("Invalid post ID"),
];

module.exports = { validatePostBody, validatePostId };
