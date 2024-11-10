let router = require("express").Router();
let AdminCtrl = require("../controlls/AdminCrtl");
let auth_admin = require("../middleware/auth");
let verifyRole = require("../middleware/authAdminstration");

router.post("/login", AdminCtrl.login);

router.post(
  "/ajouter",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AdminCtrl.AjouterSousAdmin
);
router.get("/currentadmin", auth_admin.auth_admin, AdminCtrl.CurrentAdmin);

module.exports = router;
