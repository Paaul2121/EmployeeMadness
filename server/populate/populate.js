/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const favoriteBrands = require("./favoriteBrands.json")
const EmployeeModel = require("../db/employee.model");
const BrandsModel = require("../db/brands.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brands = await BrandsModel.find()
  const brandsId = brands.map(brand => brand.id);

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    favoriteBrands: pick(brandsId)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateBrands = async () => {
  await BrandsModel.deleteMany({});

  const brands = favoriteBrands.map((brand) => ({
    "name": brand
  }));

  await BrandsModel.create(...brands);
  console.log("Brands created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateBrands();
  
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
