let mongoose = require("mongoose");

let AbonnementSchema = new mongoose.Schema({
  titre: {
    type: String,
    unique: true,
    required: true,
  },
  NombreAlbume: {
    type: Number,
    required: true,
  },
  prix: {
    type: mongoose.Types.Decimal128,
  },
  periode: {
    type: Number,
  },
  etat:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model("abonnementAlbum", AbonnementSchema);
