let abonnementAlbum = require("../models/AbonnementAlbumeModel");
let getArtison = require("../controlls/ArtisonCtrl");

let AbonnementCtrl = {
  createAbonnement: async (req, res) => {
    try {
      let { titre, NombreAlbume, prix, periode } = req.body;

      let findAlbume = await abonnementAlbum.findOne({ titre });
      if (findAlbume)
        return res.status(301).json({ msg: "Abonnement déja existe" });

      let newAlbume = new abonnementAlbum({
        titre,
        NombreAlbume,
        prix,
        periode,
      });
      await newAlbume.save();

      res.json({ result: newAlbume });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllAbonnement: async (req, res) => {
    try {
      let findAbonnements = await abonnementAlbum.find();
 
    

       res.json({ result: findAbonnements });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllAbonnementByEtat: async (req, res) => {
    try {
      let findAbonnements = await abonnementAlbum.find({etat:true});
 
    

       res.json({ result: findAbonnements });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAbonnementById: async (req, res) => {
    try {
      let findAbonnement = await abonnementAlbum.findById({
        _id: req.params.id,
      });

      res.json({ result: findAbonnement });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deletAbonnement: async (req, res) => {
    try {
      let findAbonnement = await abonnementAlbum.findByIdAndDelete({
        _id: req.params.id,
      });
      res.json({ result: findAbonnement });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateAbonnement: async (req, res) => {
    try {
      let { titre, NombreAlbume, prix, periode } = req.body;

      let updateAbonnement = await abonnementAlbum.findByIdAndUpdate(
        { _id: req.params.id },
        { titre, NombreAlbume, prix, periode }
      );
      res.json({ result: updateAbonnement });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = AbonnementCtrl;
