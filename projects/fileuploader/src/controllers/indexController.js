const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const passport = require("../auth/passport");
const { validationResult } = require("express-validator");
const errorHandler = require("../utils/errorHandler");

// Register user
const renderSignup = (req, res) => {
  res.render("layout", {
    title: "Sign Up",
    user: null,
    view: "signup",
    formData: "",
  });
};

const userCreate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("layout", {
      title: "Sign Up",
      user: null,
      view: "signup",
      errors: errors.array(),
      formData: req.body, // Repopulate the form
    });
  }

  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { username, password: hashed },
    });

    return res.render("layout", {
      title: "Log In",
      user: null,
      view: "login",
      success: "Account created successfully. You can now log in.",
    });
  } catch (err) {
    console.error("User creation error:", err.message);

    res.status(400).render("layout", {
      title: "Sign Up",
      user: null,
      view: "signup",
      errors: [{ msg: "Username already exists or something went wrong." }],
      formData: req.body,
    });
  }
};

// Log in
const renderLogin = (req, res) => {
  const failed = "fail" in req.query;
  res.render("layout", {
    title: "Log In",
    user: null,
    view: "login",
    failed: failed,
  });
};

const userLogin = async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/folders/recent",
    failureRedirect: "/login?fail",
  })(req, res, next);
};

// Logout
const userLogout = async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) {
        return errorHandler(res, "Failed to destroy session", 500, err);
      }
      res.clearCookie("connect.sid"); // Default session cookie name
      res.redirect("/login");
    });
  });
};

module.exports = {
  renderSignup,
  userCreate,
  renderLogin,
  userLogin,
  userLogout,
};
