const db = require("../db/queries");

async function wonderInfoGet(req, res) {
  const { id } = req.params;
  const wonderName = await db.getName(id);
  const wonderDescription = await db.getDescription(id);
  const wonderCategories = await db.getSelectedCategories(id);
  const wonderAddress = await db.getAddress(id);
  const wonderCountry = await db.getCountry(id);
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
  const categories = await db.getAllCategories();
  const countries = await db.getAllCountries();
  const wonderName = await db.getName(id);
  const wonderDescription = await db.getDescription(id);
  const wonderCategories = await db.getSelectedCategories(id);
  const wonderAddress = await db.getAddress(id);
  const wonderCountry = await db.getCountry(id);
  const backLink = `/wonder/${wonderName[0].id}`;
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

  const categories = await db.getAllCategories();
  const countries = await db.getAllCountries();
  const wonderName = await db.getName(id);
  const wonderDescription = await db.getDescription(id);
  const wonderCategories = await db.getSelectedCategories(id);
  const wonderAddress = await db.getAddress(id);
  const wonderCountry = await db.getCountry(id);

  res.render("wonderEdit", {
    title: "Edit Wonder",
    categories,
    countries,
    wonderName,
    wonderCategories,
    wonderDescription,
    wonderAddress,
    wonderCountry,
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
