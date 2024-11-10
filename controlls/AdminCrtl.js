let Admin = require("../models/AdminModels");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let AdminCtrl = {
  login: async (req, res) => {
    try {
      let { login, password } = req.body;
      let findAdmin = await Admin.findOne({ login }).populate("role");
      if (!findAdmin) return res.status(302).json({ msg: "login incorrect" });

      let isMatch = await bcrypt.compare(password, findAdmin.password);
      if (!isMatch)
        return res.status(302).json({ msg: "mot de passe incorrect" });
      let accessToken = createAccessToken({ id: findAdmin._id });

      res.json({ admin: findAdmin, accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  AjouterSousAdmin: async (req, res) => {
    try {
      let { nom, prenom, login, password, role } = req.body;
      let fidAdmin = await Admin.findOne({ login });
      if (fidAdmin) return res.status(302).json({ msg: "admin déja existe" });
      let passwordHash = await bcrypt.hash(password, 10);
      let newAdmin = new Admin({
        nom,
        prenom,
        login,
        password: passwordHash,
        role,
      });
      await newAdmin.save();
      res.json({ result: newAdmin });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  CurrentAdmin: async (req, res) => {
    try {
      let findAdmin = await Admin.findById(req.admin.id);
      res.json({ result: findAdmin });
    } catch (error) {}
  },
};

let createAccessToken = (admin) => {
  return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

let createRefreshToken = (admin) => {
  return jwt.sign(admin, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = AdminCtrl;
