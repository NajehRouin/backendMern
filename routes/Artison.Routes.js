let router = require("express").Router();

let ArtisonCtrl = require("../controlls/ArtisonCtrl");
let auh_artison = require("../middleware/auth");
router.post("/artison", ArtisonCtrl.ArtisonCtrl.createArtison);
router.get("/artison", ArtisonCtrl.ArtisonCtrl.getAllArtison);
router.get("/artison/:id", ArtisonCtrl.ArtisonCtrl.getArtisonByID);
router.post("/login_artison", ArtisonCtrl.ArtisonCtrl.login);

router.put(
  "/gallery",
  auh_artison.auh_artison,
  ArtisonCtrl.ArtisonCtrl.creategallery
);

module.exports = router;
