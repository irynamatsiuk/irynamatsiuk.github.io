const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET;

// Tokens :
function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
}

// General login func
exports.login =
  (allowedRoles = []) =>
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ message: "Invalid credentials" });

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied. Admins only" });
      }

      // Delete old tokens if present
      await prisma.refreshToken.deleteMany({
        where: {
          userId: user.id,
        },
      });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      res.cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 min
      });

      res.clearCookie("refreshToken", {
        path: "/",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
      });

      res.json({ message: "Login successful" });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  };

// Regenerate access token func
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    jwt.verify(token, REFRESH_TOKEN_SECRET);

    const stored = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return res
        .status(403)
        .json({ message: "Refresh token expired or not found" });
    }

    const newAccessToken = generateAccessToken(stored.user);

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.json({ message: "Token refreshed" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Logout func
exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }

    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    };

    res.clearCookie("token", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
    };
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};
