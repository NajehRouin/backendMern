let mongoose = require("mongoose");

let ClientSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  email: { type: String, trim: true, unique: true },
  password: { type: String, required: true },
  numeroTel: { type: String, required: true, unique: true },
  gouvernorat: { type: String, required: true },
  ville: { type: String, required: true },
  adresse: { type: String, required: true },
  photo: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("client", ClientSchema);
