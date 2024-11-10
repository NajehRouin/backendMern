let mongoose = require("mongoose");

let CategorieSchema = new mongoose.Schema({
  service: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("categorie", CategorieSchema);
