let mongoose = require("mongoose");

let AdminSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: "Le nom est obligatoire",
  },
  prenom: {
    type: String,
    trim: true,
  },
  login: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: "role",
  },
});
module.exports = mongoose.model("admin", AdminSchema);
