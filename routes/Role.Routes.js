let router = require("express").Router();

let RoleCtrl = require("../controlls/RoleCtrl");
let auth_admin = require("../middleware/auth");
let verifyRole = require("../middleware/authAdminstration");
router.post(
  "/role",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  RoleCtrl.AjouterRole
);
router.get(
  "/role",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  RoleCtrl.findAllRole
);
router.get("/role/:id", RoleCtrl.findRoleById);
router.put(
  "/role/:id",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  RoleCtrl.updateRole
);
module.exports = router;
