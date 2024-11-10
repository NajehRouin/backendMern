let jwt = require("jsonwebtoken");

let Authentication = {
  auth_admin: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token)
        return res.status(500).json({ msq: "Invalide Authentication" });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin) => {
        if (err)
          return res.status(500).json({ msq: "Invalide Authentication" });
        req.admin = admin;
        next();
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  auh_client: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, client) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });

        req.client = client;
        next();
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  auh_artison: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, artison) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });

        req.artison = artison;
        next();
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = Authentication;
