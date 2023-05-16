//index.js inside /api combines all api routes and exports one router middleware module
const router = require("express").Router();

const authRoutes = require("./auth");
const postRoutes = require("./post");
const userRoutes = require("./user");

router.use(authRoutes);
router.use(postRoutes);
router.use(userRoutes);

module.exports = router;
