const { Router } = require("express");
const fileRouter = Router();
const { upload } = require("../middleware/upload");
const fileController = require("../controllers/fileController");
const { ensureAuthenticated } = require("../middleware/auth");

fileRouter.post(
  "/upload",
  ensureAuthenticated,
  upload.single("file"),
  fileController.uploadFile
);

fileRouter.get(
  "/download-:id",
  ensureAuthenticated,
  fileController.downloadFile
);

fileRouter.patch(
  "/move-:id",
  ensureAuthenticated,
  fileController.moveFileToFolder
);

fileRouter.delete(
  "/delete-:id",
  ensureAuthenticated,
  fileController.deleteFile
);

module.exports = fileRouter;
