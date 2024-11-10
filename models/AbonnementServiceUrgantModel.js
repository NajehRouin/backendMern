let mongoose = require("mongoose");

let AbonnementUrgentSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  periode: {
    type: Number,
    required: true,
  },
  prix: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

module.exports = mongoose.model(
  "AbonnementServiceUrgent",
  AbonnementUrgentSchema
);
