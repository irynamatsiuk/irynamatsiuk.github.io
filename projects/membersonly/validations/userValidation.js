const { body } = require('express-validator');
const db = require('../db/queries');

const usernameLengthErr = 'must be between 2 and 20 characters.';
const passwordLengthErr = 'must be between 5 and 10 characters.';
const isRequiredErr = 'is required.';
const alphaErr = 'must contain only letters.';

const validateUser = [
  body('username')
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage(`Username ${usernameLengthErr}`)
    .custom(async (value) => {
      const existingUser = await db.findUserByUsername(value);
      if (existingUser) {
        throw new Error('Username is already taken');
      }
      return true;
    }),
  body('password')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage(`Password ${passwordLengthErr}`)
    .matches(/[a-z]/)
    .withMessage(`Password must contain at least one lowercase letter.`)
    .matches(/[A-Z]/)
    .withMessage(`Password must contain at least one uppercase letter.`)
    .matches(/[\d]/)
    .withMessage(`Password must contain at least one digit.`),
  body('confirmPassword').custom((value, { req }) => {
    if (value != req.body.password) {
      console.log('req.body.password', req.body.password);
      console.log('value:', value);
      throw new Error('Confirm password does not match');
    }
    return true;
  }),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage(`First name ${isRequiredErr}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .escape(),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage(`Last name ${isRequiredErr}`)
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .escape(),
];

module.exports = { validateUser };
