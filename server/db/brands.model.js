// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandsSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Brand", BrandsSchema);
