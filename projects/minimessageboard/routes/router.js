const { Router } = require("express");
const router = Router();

const boardController = require("../controllers/boardController");

router.get("/", boardController.getMessages);
router.get("/new", boardController.createMessageGet);
router.post("/new", boardController.createMessagePost);
router.get("/:messageId", boardController.getMessageById);

module.exports = router;
