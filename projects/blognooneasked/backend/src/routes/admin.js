const express = require("express");
const adminRouter = express.Router();

const handleValidation = require("../middleware/handleValidation");
const validateComment = require("../validation/validateComment");
const {
  validatePostBody,
  validatePostId,
} = require("../validation/validatePost");

const {
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  getPostById,
} = require("../controllers/postController");

const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");

const seedDatabase = require("../../seed");

// Posts
adminRouter.get("/posts", getAllPosts);
adminRouter.post("/posts", validatePostBody, handleValidation, createPost);
adminRouter.get("/posts/:postId", getPostById);
adminRouter.delete("/posts/:postId", deletePost);
adminRouter.put(
  "/posts/:postId",
  validatePostId,
  validatePostBody,
  handleValidation,
  editPost
);

// Comments
adminRouter.post("/comments", validateComment, handleValidation, createComment);
adminRouter.delete("/comments/:commentId", deleteComment);

// Reset db (demo purpose)
adminRouter.post("/reset", async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({ message: "Database reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reset database" });
  }
});

module.exports = adminRouter;
