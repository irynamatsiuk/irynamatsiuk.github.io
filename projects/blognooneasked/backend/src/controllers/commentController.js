const prisma = require("../config/prismaClient");

exports.createComment = async (req, res) => {
  const { content, postId } = req.validated;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: req.user.id,
      },
      include: {
        author: { select: { name: true } },
      },
    });
    return res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment" });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const existing = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!existing)
      return res.status(404).json({ message: "Comment not found" });

    await prisma.comment.delete({ where: { id: commentId } });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};
