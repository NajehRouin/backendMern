let router = require("express").Router();

let CategroieCtrl = require("../controlls/CategorieCtrl");
let auth_admin = require("../middleware/auth");
let verifyRole = require("../middleware/authAdminstration");
router.post(
  "/categorie",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  CategroieCtrl.Ajouter
);

module.exports = router;
