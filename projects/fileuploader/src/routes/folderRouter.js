const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");
const fileController = require("../controllers/fileController");
const { ensureAuthenticated } = require("../middleware/auth");

folderRouter.get("/recent", ensureAuthenticated, folderController.renderRecent);

folderRouter.post("/new", ensureAuthenticated, folderController.createFolder);

folderRouter.patch(
  "/update-:id",
  ensureAuthenticated,
  folderController.updateFolder
);

folderRouter.get("/all", ensureAuthenticated, folderController.getFolders);

folderRouter.delete(
  "/delete-:id",
  ensureAuthenticated,
  folderController.deleteFolder
);

folderRouter.get(
  "/folder-:id/files",
  ensureAuthenticated,
  fileController.getFolderFiles
);

module.exports = folderRouter;
