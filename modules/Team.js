const { model, Schema } = require("mongoose");

const teamSchema = new Schema({
  name: String,
  projCapHit: Number,
  projLTIRUsed: Number,
  projCapSpace: Number,
  positionalCap: Array,
  players: Array,
  dateCreated: String,
});

module.exports = model("Team", teamSchema);
