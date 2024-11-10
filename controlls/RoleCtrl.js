let roles = require("../models/RoleModel");

let RoleCtrl = {
  AjouterRole: async (req, res) => {
    try {
      let { nom } = req.body;
      let findRole = await roles.findOne({ nom });
      if (findRole) return res.status(302).json({ msg: "role déja existe" });

      let newRole = new roles({ nom });
      await newRole.save();
      res.json({ result: newRole });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  findAllRole: async (req, res) => {
    try {
      let findRols = await roles.find();
      res.json({ result: findRols });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  findRoleById: async (req, res) => {
    try {
      let findRole = await roles.findById({ _id: req.params.id });

      res.json({ findRole });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateRole: async (req, res) => {
    try {
      let { nom } = req.body;
      let findRole = await roles.findOne({ nom });
      if (findRole) return res.status(302).json({ msg: "role déja existe" });

      let updateRole = await roles.findByIdAndUpdate(
        { _id: req.params.id },
        { nom }
      );
      res.json({ result: updateRole });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = RoleCtrl;
