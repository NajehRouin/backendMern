let router = require("express").Router();
let auth_admin = require("../middleware/auth");
let verifyRole = require("../middleware/authAdminstration");

let AbonnementServicerUrgentCtrl = require("../controlls/AbonnementServiceUrgentCtrl");

router.get("/abonnementurgent", AbonnementServicerUrgentCtrl.getAllAbonnement);
router.get(
  "/abonnementurgent/:id",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AbonnementServicerUrgentCtrl.getAbonnmentById
);
router.post(
  "/abonnementurgent",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AbonnementServicerUrgentCtrl.createAbonnement
);
router.put(
  "/abonnementurgent/:id",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AbonnementServicerUrgentCtrl.updatAbonnement
);
router.delete(
  "/abonnementurgent/:id",
  auth_admin.auth_admin,
  verifyRole.Role_Admin,
  AbonnementServicerUrgentCtrl.deteleAbonnement
);

module.exports = router;
