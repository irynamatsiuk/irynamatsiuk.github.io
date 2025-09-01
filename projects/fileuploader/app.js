require("dotenv").config();

const express = require("express");
const path = require("node:path");

const app = express();

// Routers
const indexRouter = require("./src/routes/indexRouter");
const folderRouter = require("./src/routes/folderRouter");
const fileRouter = require("./src/routes/fileRouter");

// Middleware and libraries
const methodOverride = require("method-override");
const session = require("express-session");
const PrismaStore = require("@quixo3/prisma-session-store").PrismaSessionStore;
const passport = require("./src/auth/passport");
const prisma = require("./src/config/prismaClient");
const errorHandler = require("./src/utils/errorHandler");

// Middleware

// Allows override html form method 'post' to 'put' or 'delete'
app.use(methodOverride("_method"));

// Parse incoming form data and populate req.body
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images) from /public
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Session
// Prisma session store lib persists sessions in the database
app.use(
  session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Session expires after 1 day
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // Remove expired sessions every 2 mins
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Authentication
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Views
// Set EJS as the view engine and set views directory
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Routes
app.use("/folders", folderRouter);
app.use("/files", fileRouter);
app.use("/", indexRouter);

// Error handling:

// Page not found - 404 errors
app.use((req, res, next) => {
  errorHandler(res, "The page you're looking for does not exist.", 404);
});

// Internal server errors - 500 errores
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  errorHandler(res, err.message || "Internal server error", 500);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`File Uploader app - listening on port ${PORT}`);
});
