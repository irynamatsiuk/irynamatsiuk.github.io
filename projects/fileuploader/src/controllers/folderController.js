const prisma = require("../config/prismaClient");
const errorHandler = require("../utils/errorHandler");

const renderRecent = async (req, res) => {
  try {
    const userId = req.user.id;

    // Promise.all fetches both folders and files in parallel
    const [folders, files] = await Promise.all([
      getUserFolders(userId),
      prisma.file.findMany({
        where: { userId },
        include: { folder: true }, // Fetches the related folder data for each file
        orderBy: { updatedAt: "desc" },
      }),
    ]);
    res.render("layout", {
      title: "Home",
      view: "recent",
      user: req.user,
      folders,
      files,
    });
  } catch (err) {
    errorHandler(
      res,
      "Failed to load recent files and folders. Please try again later.",
      500,
      err.message
    );
  }
};

const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    await prisma.folder.create({
      data: {
        name,
        userId: req.user.id,
      },
    });
    res.redirect(req.get("Referer"));
  } catch (err) {
    errorHandler(
      res,
      "Failed to create a folder. Please try again later.",
      500,
      err.message
    );
  }
};

const getFolders = async (req, res) => {
  try {
    const userId = req.user.id;

    const [folders, files] = await Promise.all([
      getUserFolders(userId),
      prisma.file.findMany({
        where: { userId, folderId: null }, // Fetches files not assigned to any folder
      }),
    ]);

    res.render("layout", {
      title: "My Folders",
      view: "folders",
      user: req.user,
      folders,
      files,
    });
  } catch (err) {
    errorHandler(
      res,
      "Failed to fetch folders. Please try again later.",
      500,
      err.message
    );
  }
};

const updateFolder = async (req, res) => {
  const { newName } = req.body;
  const folderId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await prisma.folder.updateMany({
      where: { id: folderId, userId },
      data: { name: newName },
    });

    if (result.count === 0) {
      return res.status(404).send("Folder not found");
    }

    res.redirect(req.get("Referer"));
  } catch (err) {
    errorHandler(
      res,
      "Failed to update folder. Please try again later.",
      500,
      err.message
    );
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    await prisma.folder.delete({
      where: { id: folderId, userId },
    });

    res.redirect("/folders/all");
  } catch (err) {
    errorHandler(
      res,
      "Failed to delete folder. Please try again later.",
      500,
      err.message
    );
  }
};

// Utils func
const getUserFolders = async (userId) => {
  return prisma.folder.findMany({
    where: { userId },
    include: { files: true },
    orderBy: { updatedAt: "desc" },
  });
};

module.exports = {
  renderRecent,
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
};
