const prisma = require("../config/prismaClient");
const supabase = require("../config/supabaseClient");
const axios = require("axios");
const errorHandler = require("../utils/errorHandler");

const getFolderFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.id;
    // Fetch all three in parallel
    const [folders, files, currentFolder] = await Promise.all([
      prisma.folder.findMany({
        where: { userId },
        orderBy: { name: "desc" },
      }),
      prisma.file.findMany({
        where: { userId, folderId },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.folder.findUnique({
        where: {
          id: folderId,
          userId,
        },
      }),
    ]);

    res.render("layout", {
      title: `Files in ${currentFolder?.name || "Unknown Folder"}`,
      view: "files",
      user: req.user,
      files,
      currentFolder,
      folders,
    });
  } catch (err) {
    errorHandler(
      res,
      "Error loading folder files. Please try again later.",
      500,
      err.message
    );
  }
};

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const folderId = req.body.folderId || null; // Gets folderId from form
    const userId = req.user.id;

    // Generate unique file path
    const filename = `${Date.now()}-${file.originalname}`;
    const path = folderId
      ? `${userId}/${folderId}/${filename}`
      : `${userId}/${filename}`;

    // Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      console.error(uploadError);
      throw new Error("Upload failed: " + uploadError.message);
    }
    // Get public URL
    const publicUrl = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(path).data.publicUrl;

    // Save file record in DB
    await prisma.file.create({
      data: {
        name: file.originalname,
        url: publicUrl,
        path: path,
        mimetype: file.mimetype,
        size: file.size,
        userId,
        folderId,
      },
    });

    res.redirect(req.get("Referer"));
  } catch (err) {
    errorHandler(
      res,
      "File upload failed. Please try again later.",
      500,
      err.message
    );
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: req.params.id },
    });

    if (!file || file.userId !== req.user.id) {
      throw new Error("File not found or access denied");
    }

    const fileStream = await axios({
      method: "GET",
      url: file.url,
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.setHeader("Content-Type", fileStream.headers["content-type"]);

    fileStream.data.pipe(res);
  } catch (err) {
    errorHandler(
      res,
      "Failed to download file. Please try again later.",
      500,
      err.message
    );
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;
    const bucketName = process.env.SUPABASE_BUCKET;

    // Check if file exists and if user is authorized
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });
    if (!file || file.userId !== userId) {
      throw new Error("File not found or access denied");
    }

    // Delete file from Supabase
    const { error: storageError } = await supabase.storage
      .from(bucketName)
      .remove([file.path]);

    if (storageError) {
      throw new Error("Supabase deletion error:" + storageError);
    }

    // Delete file record from database
    await prisma.file.delete({
      where: { id: fileId },
    });

    res.redirect(req.get("Referer"));
  } catch (err) {
    errorHandler(
      res,
      "Error deleting file. Please try again later.",
      500,
      err.message
    );
  }
};

const moveFileToFolder = async (req, res) => {
  try {
    const fileId = req.params.id;
    const folderId = req.body.folderId;
    const userId = req.user.id;

    // Check if file exists and if user is authorized
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });
    if (!file || file.userId !== userId) {
      throw new Error("File not found or access denied");
    }

    // Move file to a new folder
    await prisma.file.update({
      where: { id: fileId },
      data: { folderId },
    });

    res.redirect(req.get("Referer"));
  } catch (err) {
    errorHandler(
      res,
      "Failed to move file. Please try again later.",
      500,
      err.message
    );
  }
};

module.exports = {
  getFolderFiles,
  uploadFile,
  downloadFile,
  deleteFile,
  moveFileToFolder,
};
