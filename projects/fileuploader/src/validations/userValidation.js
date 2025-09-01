const { body } = require("express-validator");
const prisma = require("../config/prismaClient");

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage(`Username must be between 2 and 20 characters.`)
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: value },
      });
      if (existingUser) {
        throw new Error("Username is already taken");
      }
      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage(`Password must be between 5 and 10 characters.`)
    .matches(/[a-z]/)
    .withMessage(`Password must contain at least one lowercase letter.`)
    .matches(/[A-Z]/)
    .withMessage(`Password must contain at least one uppercase letter.`)
    .matches(/[\d]/)
    .withMessage(`Password must contain at least one digit.`),
  body("confirmPassword").custom((value, { req }) => {
    if (value != req.body.password) {
      console.log("req.body.password", req.body.password);
      console.log("value:", value);
      throw new Error("Confirm password does not match.");
    }
    return true;
  }),
];

module.exports = { validateUser };
