let mongoose = require("mongoose");

let RoleSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Le nom est obligatoire"],
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model("role", RoleSchema);
