const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const router = express.Router();


// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/gallery/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Route for uploading files
router.post("/gallery", upload.array("files"), async (req, res) => {
  try {
    

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ msg: "No files were uploaded." });
    }

    if (files.length > 5) {
      return res.status(400).json({ msg: "You have exceeded the maximum number of files." });
    }

    res.json({ message: "Successfully uploaded files", result: files });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({ msg: "An error occurred during file upload." });
  }
});

module.exports = router;
