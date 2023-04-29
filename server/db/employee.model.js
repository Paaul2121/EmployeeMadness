// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  favoriteBrands: { type: Schema.Types.ObjectId, ref: "Brand" },
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
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
