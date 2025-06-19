const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const router = require("./routes/router");

const path = require("node:path");

const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath)); //enables the use of static assets, and we tell it to look for assets with the public directory as the root

app.use(express.urlencoded({ extended: true })); // parses URL-encoded form data and make it available in req. body

app.use("/", router);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Message Board app - listening on port ${PORT}!`);
});
