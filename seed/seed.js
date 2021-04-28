const { User, Neighborhood, Review } = require("../models");
const sequelize = require("../config/connection");

const userData = require("./userData.json");
const neighborhoodData = require("./neighborhoodData.json");
const reviewData = require("./reviewData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Neighborhood.bulkCreate(neighborhoodData);
  await Review.bulkCreate(reviewData);
  process.exit(0);
};
seedDatabase();
