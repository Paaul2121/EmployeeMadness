// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  favoriteBrands: { type: Schema.Types.ObjectId, ref: "Brand" },
  favoriteColor: { type: Schema.Types.ObjectId, ref: "Color" },
  equipment: {
   type: String,
   default: "No Equipment" 
  },
  presence: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    default: 0
  },
  workLog: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
