let Artison = require("../models/ArtisonModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let mongoose = require("mongoose");
let ArtisonCtrl = {
  createArtison: async (req, res) => {
    try {
      let {
        nom,
        prenom,
        email,
        password,
        numeroTel,
        photo,
        gouvernorat,
        ville,
        adresse,
        service,
      } = req.body;

      let findArtison = await Artison.findOne({ numeroTel });
      if (findArtison)
        return res
          .status(301)
          .json({ msg: "numero de telephone déja existe " });
      let passwordHash = await bcrypt.hash(password, 10);
      let pathimg = "";
      if (photo != "") {
        pathimg = "/upload/photo_profil/" + photo;
      } else {
        pathimg = "";
      }
      let newArtison = new Artison({
        nom,
        prenom,
        email,
        password: passwordHash,
        numeroTel,
        photo: pathimg,
        gouvernorat,
        ville,
        adresse,
        service,
      });
      await newArtison.save();
      res.json({ result: newArtison });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllArtison: async (req, res) => {
    try {
      let findAllArtison = await Artison.find().populate("service");
   
      res.json({ result: findAllArtison });
    } catch (error) {
      return error.message;
    }
  },

  getArtisonByID: async (req, res) => {
    try {
      let findArtison = await Artison.findById({ _id: req.params.id }).populate('service')
      res.json({ result: findArtison });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body;

      let findArtison = await Artison.findOne({ email }).populate("service");
      if (!findArtison)
        return res.status(301).json({ msg: "login incorrecte" });
      let isMatch = await bcrypt.compare(password, findArtison.password);
      if (!isMatch)
        return res.status(400).json({ msg: "mot de passe incorrect" });

      let accessToken = createAccessToken({ id: findArtison._id });
      res.json({ ...findArtison._doc, accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  creategallery: async (req, res) => {
    try {
      let findArtison = await Artison.findById(req.artison.id);
      let { gallery } = req.body;
      let array = [];
      for (let i = 0; i < gallery.length; i++) {
        array.push({ [`photo`]: "/upload/gallery/" + gallery[i].photo });
      }
      let updateArtison = await Artison.findByIdAndUpdate(
        { _id: findArtison._id },
        {
          gallery: array,
        }
      );

      res.json({ result: updateArtison });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  science: async (req, artison, res) => {
    let findArtison = await Artison.findById({
      _id: artison,
    }).populate("service");
    //console.log("first", findArtison);
    return findArtison;
    //return findArtison;
  },
};
let createAccessToken = (artison) => {
  return jwt.sign(artison, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
let getArtison = async (req, res) => {
  try {
    let { artison } = req.body;
    console.log("artison", artison);
    let findArtison = await Artison.findById({
      _id: artison,
    }).populate("service");
    console.log("findArtison", findArtison);
  } catch (error) {
    return error.message;
  }
};

module.exports = { ArtisonCtrl, getArtison };
