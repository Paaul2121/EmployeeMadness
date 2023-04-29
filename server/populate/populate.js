/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const favoriteBrands = require("./favoriteBrands.json");
const favoriteColors = require("./favoriteColors.json")
const EmployeeModel = require("../db/employee.model");
const BrandsModel = require("../db/brands.model")
const ColorsModel = require("../db/colors.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brands = await BrandsModel.find();
  const colors = await ColorsModel.find();
  const brandsId = brands.map(brand => brand.id);
  const colorsId = colors.map(color => color.id);

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    favoriteBrands: pick(brandsId),
    favoriteColor: pick(colorsId)
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

const populateColors = async () => {
  await ColorsModel.deleteMany({});

  const colors = favoriteColors.map((color) => ({
    "name": color
  }));

  await ColorsModel.create(...colors);
  console.log("Colors created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateColors();

  await populateBrands();
  
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
