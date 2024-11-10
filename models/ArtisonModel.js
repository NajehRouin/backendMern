let mongoose = require("mongoose");

let ArtisonSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: true,
  },
  prenom: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  numeroTel: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  gouvernorat: {
    type: String,
    trim: true,
    required: true,
  },
  ville: {
    type: String,
    trim: true,
    required: true,
  },
  adresse: {
    type: String,
    trim: true,
    required: true,
  },
  service: {
    type: mongoose.Types.ObjectId,
    ref: "categorie",
  },
  apropos: {
    type: String,
    default: "",
  },
  gallery: [],
  reviews: [
    {
      client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
      },
      commentaire: {
        type: String,
      },
      raiting: {
        type: Number,
      },
    },
  ],
});
module.exports = mongoose.model("artison", ArtisonSchema);
