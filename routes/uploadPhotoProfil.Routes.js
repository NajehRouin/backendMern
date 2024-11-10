let router = require("express").Router();
let multer = require("multer");


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/photo_profil/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

router.post("/photo_profil", upload.single("file"), async (req, res) => {
  let file = req.file;

  res.json({ message: "Successfully uploaded files", result: file });
});

module.exports = router;
