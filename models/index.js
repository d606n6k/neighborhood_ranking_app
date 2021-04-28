const User = require("./User");
const Neighborhood = require("./Neighborhood");
const Review = require("./Review");

// Define sequelize associations in this file.
User.hasMany(Review, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Neighborhood.hasMany(Review, {
  foreignKey: "neighborhood_id",
  onDelete: "CASCADE",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

Review.belongsTo(Neighborhood, {
  foreignKey: "neighborhood_id",
});

module.exports = { User };
