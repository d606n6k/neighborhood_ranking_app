const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Neighborhood, Review } = require("../models");
const withAuth = require("../util/withAuth");

// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

// Need withAuth
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.session.userId }, // need user id upon logging
      attributes: { exclude: ["email", "password"] },
      include: [
        {
          model: Review,
          include: [{ model: Neighborhood }],
        },
      ],
    });

    const serializedU = userData.get({ plain: true });
    res.status(200).json(userData);
    console.log(serializedU);
    res.render("profile", { userData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const neighborhoodData = await Neighborhood.findAll({
      include: [{ model: Review }],
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT AVG(rating) FROM review WHERE review.neighborhood_id = neighborhood.id)"
            ),
            "avgrank",
          ],
        ],
      },
    });
    const serializedN = neighborhoodData.map((neighborhood) =>
      neighborhood.get({ plain: true })
    );
    res.status(200).json(neighborhoodData);
    console.log(serializedN);
    // res.render("homepage", { user, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign-Up Page" });
});

module.exports = router;
