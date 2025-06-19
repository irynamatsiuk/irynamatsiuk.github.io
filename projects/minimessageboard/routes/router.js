const { Router } = require("express");
const router = Router();

const boardController = require("../controllers/boardController");

router.get("/", boardController.getMessageBoard);
router.get("/new", boardController.getForm);
router.post("/new", boardController.postMessage);
router.get("/:messageId", boardController.getMessageById);

module.exports = router;
