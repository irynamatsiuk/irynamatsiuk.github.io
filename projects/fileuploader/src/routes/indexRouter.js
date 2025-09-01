const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const {
  ensureNotAuthenticated,
  ensureAuthenticated,
} = require("../middleware/auth");
const { validateUser } = require("../validations/userValidation");

// Sign Up
indexRouter.get(
  "/signup",
  ensureNotAuthenticated,
  indexController.renderSignup
);
indexRouter.post(
  "/signup",
  ensureNotAuthenticated,
  validateUser,
  indexController.userCreate
);

// Log In
indexRouter.get("/login", ensureNotAuthenticated, indexController.renderLogin);
indexRouter.post("/login", ensureNotAuthenticated, indexController.userLogin);

// Log Out
indexRouter.post("/logout", ensureAuthenticated, indexController.userLogout);

// Redirect to login page
indexRouter.get("/", (req, res) => res.redirect("/login"));

module.exports = indexRouter;
