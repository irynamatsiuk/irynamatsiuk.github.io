const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");
const { authenticate, requireAdmin } = require("./middleware/auth");

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_ADMIN], // TODO: add user/public front-end link
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route groups
app.use("/api", authRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/admin", authenticate, requireAdmin, adminRoutes);
// TODO : app.use("/api/user", authenticate, userRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

module.exports = app;
