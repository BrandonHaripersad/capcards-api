const { model, Schema } = require("mongoose");

const playerSchema = new Schema({
  name: String,
  position: String,
  yearsRemaining: String,
  clauses: String,
  status: String,
  injury: String,
  age: Number,
  capPercentage: Number,
  capHit: Number,
  link: String,
  transactionLink: String,
});

module.exports = model("Player", playerSchema);
