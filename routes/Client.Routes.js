let router = require("express").Router();
let ClientCtrl = require("../controlls/ClientCtrl");
let auh_client = require("../middleware/auth");
router.post("/client", ClientCtrl.createClient);
router.post("/loginClient", ClientCtrl.login);
router.get("/clients", ClientCtrl.getAllClient);

router.get("/profil", auh_client.auh_client, ClientCtrl.ProfilClient);
router.put("/update_profil", auh_client.auh_client, ClientCtrl.UpdateProfil);

module.exports = router;
