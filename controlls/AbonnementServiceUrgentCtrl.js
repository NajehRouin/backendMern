let AbonnementServiceUrgent = require("../models/AbonnementServiceUrgantModel");

let AbonnementServicerUrgentCtrl = {
  createAbonnement: async (req, res) => {
    try {
      let { titre, periode, prix } = req.body;
      let findAbonnemet = await AbonnementServiceUrgent.findOne({ titre });
      if (findAbonnemet)
        return res.status(301).json({ msg: "Abonnement déja existe" });

      let newAbonnement = new AbonnementServiceUrgent({ titre, periode, prix });
      await newAbonnement.save();
      res.json({ result: newAbonnement });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllAbonnement: async (req, res) => {
    try {
      let findAbonnemets = await AbonnementServiceUrgent.find();
      res.json({ result: findAbonnemets });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAbonnmentById: async (req, res) => {
    try {
      let findAbonnemet = await AbonnementServiceUrgent.findById({
        _id: req.params.id,
      });
      res.json({ result: findAbonnemet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatAbonnement: async (req, res) => {
    try {
      let { titre, periode, Prix } = req.body;

      let findAbonnementAndUpadet =
        await AbonnementServiceUrgent.findByIdAndUpdate(
          { _id: req.params.id },
          {
            titre,
            periode,
            Prix,
          }
        );

      res.json({ result: findAbonnementAndUpadet });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deteleAbonnement: async (req, res) => {
    try {
      let findAbonnement = await AbonnementServiceUrgent.findByIdAndDelete({
        _id: req.params.id,
      });
      res.json({ result: findAbonnement });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = AbonnementServicerUrgentCtrl;
