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
      where: { id: req.session.userId },
      attributes: { exclude: ["email", "password"] },
      include: [
        {
          model: Review,
          include: [{ model: Neighborhood }],
        },
      ],
    });

    const serializedU = userData.get({ plain: true });
    res.render("profile", { serializedU, isLoggedIn: req.session.isLoggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const neighborhoodData = await Neighborhood.findAll({
      include: [
        {
          model: Review,
          include: [
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
          order: '"post_time" DESC',
        },
      ],
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
    console.log(serializedN);
    res.render("home", { serializedN, isLoggedIn: req.session.isLoggedIn });
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
