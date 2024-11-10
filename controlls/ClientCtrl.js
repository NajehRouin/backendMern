let Client = require("../models/ClientModel");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let ClientCtrl = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;

      let findClient = await Client.findOne({ email });
      if (!findClient) return res.status(301).json({ msg: "login incorrecte" });
      let isMatch = await bcrypt.compare(password, findClient.password);
      if (!isMatch)
        return res.status(400).json({ msg: "mot de passe incorrect" });

      let accessToken = createAccessToken({ id: findClient._id });
      res.json({ ...findClient._doc, accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createClient: async (req, res) => {
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
      } = req.body;

      let findClientByEmail = await Client.findOne({ email });
      if (findClientByEmail)
        return res.status(301).json({ msg: "email déja existe" });
      let findClientByNumero = await Client.findOne({ numeroTel });
      if (findClientByNumero)
        return res.status(301).json({ msg: "numero telephone déja existe" });

      let passwordHash = await bcrypt.hash(password, 10);

      let pathimg = "";
      if (photo != "") {
        pathimg = "/upload/photo_profil/" + photo;
      } else {
        pathimg = "";
      }
      let newClient = new Client({
        nom,
        prenom,
        email,
        password: passwordHash,
        numeroTel,
        photo: pathimg,
        gouvernorat,
        ville,
        adresse,
      });
      await newClient.save();
      res.json({ result: newClient });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllClient: async (req, res) => {
    try {
      let findClient = await Client.find();
      res.json({ result: findClient });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  ProfilClient: async (req, res) => {
    try {
      let findClient = await Client.findById(req.client.id);
      res.json({ result: findClient });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  UpdateProfil: async (req, res) => {
    try {
      let findClient = await Client.findById(req.client.id);
      let {
        nom,
        prenom,
        email,
        password,
        numeroTel,
        gouvernorat,
        ville,
        adresse,
      } = req.body;
      let findClientByemail = await Client.find({
        email: { $ne: findClient.email },
      });
      let findemail = findClientByemail.find(
        (client) => client.email === email
      );
      let findnumero = findClientByemail.find(
        (client) => client.numeroTel === numeroTel
      );
      if (findemail) return res.status(301).json({ msg: "email existe" });
      if (findnumero) return res.status(301).json({ msg: "numero  existe" });
      let passwordHash = await bcrypt.hash(password, 10);
      let updateClient = await Client.findByIdAndUpdate(
        { _id: findClient._id },
        {
          nom,
          prenom,
          email,
          password: passwordHash,
          numeroTel,
          gouvernorat,
          ville,
          adresse,
        }
      );

      res.json({ result: updateClient });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
let createAccessToken = (client) => {
  return jwt.sign(client, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
module.exports = ClientCtrl;
