const { model, Schema } = require("mongoose");

const playerSchema = new Schema({
  name: String,
  position: String,
  yearsRemaining: String,
  clauses: String,
  status: String,
  age: Number,
  capPercentage: Number,
  capHit: Number,
});

module.exports = model("Player", playerSchema);
