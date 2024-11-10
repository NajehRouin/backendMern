let router = require("express").Router();
let auth_admin = require("../middleware/auth");
let verifyRole = require("../middleware/authAdminstration");

let AbonnementCtrl = require("../controlls/AbonnementAlbumeCtrl");

router.get("/abonnementAlbume", AbonnementCtrl.getAllAbonnement);
router.get('/getAllAbonnementByEtat',AbonnementCtrl.getAllAbonnementByEtat)

router.get("/abonnementAlbume/:id", AbonnementCtrl.getAbonnementById);

router.post(
  "/abonnementAlbume",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AbonnementCtrl.createAbonnement
);
router.put(
  "/abonnementAlbume/:id",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AbonnementCtrl.updateAbonnement
);

router.delete(
  "/abonnementAlbume/:id",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AbonnementCtrl.deletAbonnement
);

module.exports = router;
