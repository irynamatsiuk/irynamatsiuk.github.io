const express = require("express");
const authRouter = express.Router();

const {
  login,
  refreshToken,
  logout,
  getMe,
} = require("../controllers/authController");

const { authenticate } = require("../middleware/auth");

// Admin
authRouter.post("/admin/login", login(["ADMIN"]));

// TODO: user auth

// Admin & user
authRouter.post("/refresh", refreshToken);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticate, getMe);

module.exports = authRouter;
