const router = require("express").Router();
const homeRouter = require("./home-router");
const apiRouter = require("./api");
const neighborhoodRouter = require("./neighborhood-router");
router.use("/", homeRouter);
router.use("/api", apiRouter);
router.use("/neighborhood", neighborhoodRouter);
module.exports = router;
