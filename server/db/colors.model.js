// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const ColorsSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Color", ColorsSchema);
