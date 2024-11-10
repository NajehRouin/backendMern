let router = require("express").Router();

let DemandeUrgentCtrl = require("../controlls/DemandeUrgentCtrl");
let auh_client = require("../middleware/auth");

router.post(
  "/demandeUrgent",
  auh_client.auh_client,
  DemandeUrgentCtrl.createDemande
);

module.exports = router;
