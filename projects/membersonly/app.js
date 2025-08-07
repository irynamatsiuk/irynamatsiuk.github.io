require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('./config/passport');
const router = require('./routes/router');
const app = express();
const CustomError = require('./utils/CustomError');
const pool = require('./db/pool');

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// give access to the currentUser variable in all views,
// so no need manually pass it into all of the controllers in which you need it
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// styling
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// routes
app.use('/', router);

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// errors
// 404 handler, bc express doesn't throw a 404 automatically
app.use((req, res, next) => {
  next(new CustomError('Page not found', 404));
});

// global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err.stack);
  res.status(status).render('error', {
    title: `Error ${status}`,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Members Only app listening on port ${PORT}!`),
);
