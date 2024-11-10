let Admin = require("../models/AdminModels");

let verifyRole = {
  Role_Admin: async (req, res, next) => {
    try {
      let admin = await Admin.findOne({ _id: req.admin.id })
        .populate("role", "nom")
        .exec();

      if (admin.role.nom !== "admin")
        return res.status(400).json({ msg: " admin resource acces denied." });
      next();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = verifyRole;
