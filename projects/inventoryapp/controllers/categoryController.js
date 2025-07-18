const db = require("../db/queries");
const { capitalizeWords } = require("../utils/capitalizeText");

async function addCategoryGet(req, res) {
  const { id } = req.params;
  const categories = await db.getAllCategories();
  const backLink = `/wonder/${id}/edit`;
  res.render("categories", {
    title: "Manage Categories",
    id,
    categories,
    backLink,
  });
}

async function addCategoryPost(req, res) {
  const { id } = req.params;
  let { newCategory } = req.body;
  newCategory = capitalizeWords(newCategory);
  await db.insertCategory(newCategory);
  res.redirect(`/wonder/${id}/categories`);
}

async function editCategoryGet(req, res) {
  const { id } = req.params;
  const { categoryId } = req.params;
  const categoryName = await db.getCategoryById(categoryId);
  const backLink = `/wonder/${categoryId}/categories/`;
  res.render("categoryEdit", {
    title: "Edit Category",
    id,
    categoryId,
    categoryName,
    backLink,
  });
}

async function editCategoryPost(req, res) {
  const { id } = req.params;
  const { categoryId } = req.params;
  const { name } = req.body;
  await db.updateCategoryName(categoryId, name);
  res.redirect(`/wonder/${id}/categories`);
}

async function deleteCategoryGet(req, res) {
  const { id } = req.params;
  const { categoryId } = req.params;
  const categoryName = await db.getCategoryById(categoryId);
  const formAction = `/wonder/${id}/categories/delete-${categoryId}`;
  const backLink = `/wonder/${id}/categories`;
  const inputName = "categoryToDelete";
  res.render("delete", {
    title: "Delete Category",
    name: categoryName[0].name,
    id,
    categoryId,
    backLink,
    inputName,
    formAction,
  });
}

async function deleteCategoryPost(req, res) {
  const { id } = req.params;
  const { categoryId } = req.params;
  await db.deleteWonderCategoryRelations(categoryId);
  await db.deleteCategoryById(categoryId);
  res.redirect(`/wonder/${id}/categories`);
}

module.exports = {
  addCategoryGet,
  addCategoryPost,
  editCategoryGet,
  editCategoryPost,
  deleteCategoryGet,
  deleteCategoryPost,
};
