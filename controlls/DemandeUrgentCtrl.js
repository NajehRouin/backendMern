let client = require("../models/ClientModel");
let DemandeUrgent = require("../models/DemmandeUrgentModel");

let DemandeUrgentCtrl = {
  createDemande: async (req, res) => {
    try {
      let { demande, photo, jour, heure } = req.body;
      let findClient = await client.findById(req.client.id);
      let newDemande = new DemandeUrgent({
        idClient: findClient._id,
        demande,
        photo,
        jour,
        heure,
      });
      
      await newDemande.save();
      res.json({ result: newDemande });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = DemandeUrgentCtrl;
