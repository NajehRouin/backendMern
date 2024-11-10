let mongoose = require("mongoose");

let DemandeSchema = new mongoose.Schema({
  idClient: {
    type: mongoose.Types.ObjectId,
    ref: "client",
  },
  demande: {
    type: String,
  },
  photo: {
    type: String,
  },
  jour: {
    type: String,
  },
  heure: {
    type: String,
  },
});

module.exports = mongoose.model("demandeUrgent", DemandeSchema);
