const prisma = require("../config/prismaClient");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, published } = req.validated;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: req.user.id,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Error creating post" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      return res.status(400).json({ message: "Cannot get post id" });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: {
            author: {
              select: { name: true }, // add comment's author name
            },
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Error fetching post" });
  }
};

exports.editPost = async (req, res) => {
  const { postId, title, content, published } = req.validated;

  try {
    const existing = await prisma.post.findUnique({ where: { id: postId } });

    if (!existing) return res.status(404).json({ message: "Post not found" });

    const updated = await prisma.post.update({
      where: { id: postId },
      data: { title, content, published },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Error updating post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: "Cannot get post id" });
    }

    const existing = await prisma.post.findUnique({ where: { id: postId } });
    if (!existing) return res.status(404).json({ message: "Post not found" });

    await prisma.post.delete({ where: { id: postId } });
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Error deleting post" });
  }
};
