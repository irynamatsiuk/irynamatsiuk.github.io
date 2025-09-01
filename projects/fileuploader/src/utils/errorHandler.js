const errorHandler = (
  res,
  userError = "Something went wrong",
  statusCode = 500,
  devError = null
) => {
  if (devError) {
    console.log("Detailed Error:", devError);
  }

  res.status(statusCode).render("layout", {
    title: statusCode === 404 ? "Not Found" : "Error",
    view: "error",
    error: userError,
    user: res.locals.user || null,
  });
};

module.exports = errorHandler;
