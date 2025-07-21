const db = require("../db/queries");
const { sortObjectsByName } = require("../utils/sortObjectsByName");

async function wonderInfoGet(req, res) {
  const { id } = req.params;
  const wonderName = await db.getName(id);
  const wonderDescription = await db.getDescription(id);
  let wonderCategories = await db.getSelectedCategories(id);
  const wonderAddress = await db.getAddress(id);
  const wonderCountry = await db.getCountry(id);
  wonderCategories = sortObjectsByName(wonderCategories);
  res.render("wonderInfo", {
    title: "Wonder Info",
    wonderName,
    wonderCategories,
    wonderDescription,
    wonderAddress,
    wonderCountry,
  });
}

async function wonderEditGet(req, res) {
  const { id } = req.params;
  let categories = await db.getAllCategories();
  let countries = await db.getAllCountries();
  const wonderName = await db.getName(id);
  const wonderDescription = await db.getDescription(id);
  const wonderCategories = await db.getSelectedCategories(id);
  const wonderAddress = await db.getAddress(id);
  const wonderCountry = await db.getCountry(id);
  const backLink = `/wonder/${id}`;
  countries = sortObjectsByName(countries);
  categories = sortObjectsByName(categories);
  res.render("wonderEdit", {
    title: "Edit Wonder",
    categories,
    countries,
    wonderName,
    wonderCategories,
    wonderDescription,
    wonderAddress,
    wonderCountry,
    backLink,
  });
}

async function wonderEditPost(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const { description } = req.body;
  const { checkedCategories } = req.body;
  const { country } = req.body;
  const { address } = req.body;
  const backLink = `/wonder/${id}`;

  if (name) {
    await db.updateName(id, name);
  }
  if (description != undefined) {
    await db.updateDescription(id, description);
  }
  if (checkedCategories != undefined) {
    let values = "";
    Array.from(checkedCategories).forEach(
      (c) => (values += `('${id}' , '${c}'),`)
    );
    values = values.replace(/,$/, "");
    await db.addCheckedCategories(values);
    await db.deleteUncheckedCategories(id, checkedCategories.toString());
  }
  if (country != undefined && address != undefined) {
    await db.updateLocation(id, country, address);
  }

  let categories = await db.getAllCategories();
  let countries = await db.getAllCountries();
  const wonderName = await db.getName(id);
  const wonderDescription = await db.getDescription(id);
  const wonderCategories = await db.getSelectedCategories(id);
  const wonderAddress = await db.getAddress(id);
  const wonderCountry = await db.getCountry(id);
  categories = sortObjectsByName(categories);
  countries = sortObjectsByName(countries);

  res.render("wonderEdit", {
    title: "Edit Wonder",
    categories,
    countries,
    wonderName,
    wonderCategories,
    wonderDescription,
    wonderAddress,
    wonderCountry,
    backLink,
  });
}

async function wonderDeleteGet(req, res) {
  const { id } = req.params;
  const wonder = await db.getName(id);
  const formAction = `/wonder/${id}/edit/delete`;
  const inputName = "wonderToDelete";
  const backLink = `/wonder/${id}/edit`;
  res.render("delete", {
    title: "Delete Wonder",
    name: wonder[0].name,
    formAction,
    inputName,
    backLink,
    id,
  });
}

async function wonderDeletePost(req, res) {
  const { id } = req.params;
  await db.cleanUpWonderDescription(id);
  await db.cleanUpWonderCategories(id);
  await db.cleanUpWonderLocation(id);
  await db.deleteWonder(id);
  res.redirect("/");
}

module.exports = {
  wonderInfoGet,
  wonderEditGet,
  wonderEditPost,
  wonderDeleteGet,
  wonderDeletePost,
};
