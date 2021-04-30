const router = require("express").Router();
const usersRouter = require("./users-router");
const reviewsRouter = require("./reviews-router");
router.use("/reviews", reviewsRouter);
router.use("/users", usersRouter);
module.exports = router;
