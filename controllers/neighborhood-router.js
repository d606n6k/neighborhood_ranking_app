const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Neighborhood, Review } = require("../models");
// const withAuth = require("../util/withAuth");

// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

// Need withAuth
router.get("/:id", async (req, res) => {
  try {
    const neighborHood = await Neighborhood.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Review,
          include: [{ model: Neighborhood }],
        },
      ],
    });

    const neighborhoodSerialized = neighborHood.get({ plain: true });
    res.render("neighborhood", {
      neighborhoodSerialized,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
