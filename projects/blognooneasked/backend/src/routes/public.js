const express = require("express");
const publicRouter = express.Router();

// TODO: Public routes for
// 1. all published posts,
// 2. published post by id with it's comments,
// 3. demo user credentials

// Demo credentials:
publicRouter.get("/demo-admin", (req, res) => {
  // simple check to block bot requests
  if (!req.headers["user-agent"]?.includes("Mozilla")) {
    return res.status(403).json({ error: "Bot-like request" });
  }
  res.json({
    login: process.env.DEMO_ADMIN_EMAIL,
    pass: process.env.DEMO_ADMIN_PASS,
  });
});

module.exports = publicRouter;
