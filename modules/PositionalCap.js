const { model, Schema } = require("mongoose");

const postionalCapSchema = new Schema({
  position: String,
  percentage: Number,
  rank: Number,
});

module.exports = model("PositionalCap", postionalCapSchema);
