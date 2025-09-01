function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function ensureNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("./folders/recent");
  }
  next();
}

module.exports = {
  ensureAuthenticated,
  ensureNotAuthenticated,
};
