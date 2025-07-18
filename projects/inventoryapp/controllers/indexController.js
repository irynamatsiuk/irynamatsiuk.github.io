const db = require("../db/queries");
const { capitalizeWords } = require("../utils/capitalizeText");

async function wondersGet(req, res) {
  const countries = await db.getAllCountries();
  const categories = await db.getAllCategories();
  const wonders = await db.getAllWonders();
  res.render("index", {
    title: "Wonders of Europe",
    wonders,
    categories,
    countries,
    selectedCountry: "allCountries",
    selectedCategory: "allCategories",
  });
}

async function newWonderGet(req, res) {
  const categories = await db.getAllCategories();
  const countries = await db.getAllCountries();
  res.render("newWonder", {
    title: "New Wonder",
    categories,
    countries,
  });
}

async function newWonderPost(req, res) {
  let { name } = req.body;
  name = capitalizeWords(name);
  db.insertWonder(name);
  res.redirect("/");
}

async function filterWondersGet(req, res) {
  const { country, category } = req.query;
  const countries = await db.getAllCountries();
  const categories = await db.getAllCategories();
  let wonders;

  if (country == "allCountries" && category == "allCategories") {
    wonders = await db.getAllWonders();
  } else {
    wonders = await db.getFilteredWonders(category, country);
  }

  res.render("index", {
    title: "Wonders of Europe",
    wonders,
    categories,
    countries,
    selectedCategory: category,
    selectedCountry: country,
  });
}

module.exports = {
  wondersGet,
  newWonderGet,
  newWonderPost,
  filterWondersGet,
};
