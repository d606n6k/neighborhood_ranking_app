const router = require("express").Router();
const { User, Neighborhood, Review } = require("../models");

// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });

// Need withAuth
router.get("/profile", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: 1 }, // need user id upon logging
      attributes: { exclude: ["email", "password"] },
      include: [
        {
          model: Review,
          include: [{ model: Neighborhood }],
        },
      ],
    });
    console.log(userData);
    res.status(200).json(userData);
    // res.render("profile", { user, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ["password"],
        raw: true,
      });
    }
    res.render("home", {
      title: "Home Page",
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign-Up Page" });
});

module.exports = router;
