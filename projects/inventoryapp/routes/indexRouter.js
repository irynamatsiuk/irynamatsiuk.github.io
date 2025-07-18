const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const validator = require("../validations/newWonderValidator");

indexRouter.get("/", indexController.wondersGet);
indexRouter.get("/new", indexController.newWonderGet);
indexRouter.post(
  "/new",
  validator.newWonderValidationRules,
  validator.validateNewWonder,
  indexController.newWonderPost
);
indexRouter.get("/filter", indexController.filterWondersGet);

module.exports = indexRouter;
