const { Router } = require("express");
const wonderRouter = Router();
const wonderController = require("../controllers/wonderController");
const categoryController = require("../controllers/categoryController");

wonderRouter.get("/:id", wonderController.wonderInfoGet);

wonderRouter.get("/:id/edit", wonderController.wonderEditGet);
wonderRouter.post("/:id/edit", wonderController.wonderEditPost);

wonderRouter.get("/:id/edit/delete", wonderController.wonderDeleteGet);
wonderRouter.post("/:id/edit/delete", wonderController.wonderDeletePost);

// categories:
wonderRouter.get("/:id/categories", categoryController.addCategoryGet);
wonderRouter.post("/:id/categories", categoryController.addCategoryPost);

wonderRouter.get(
  "/:id/categories/edit-:categoryId",
  categoryController.editCategoryGet
);
wonderRouter.post(
  "/:id/categories/edit-:categoryId",
  categoryController.editCategoryPost
);

wonderRouter.get(
  "/:id/categories/delete-:categoryId",
  categoryController.deleteCategoryGet
);
wonderRouter.post(
  "/:id/categories/delete-:categoryId",
  categoryController.deleteCategoryPost
);

module.exports = wonderRouter;
