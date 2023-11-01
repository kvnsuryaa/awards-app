const router = require("express").Router();

// controllers
const authController = require("../controllers/auth.controller");
const awardsController = require("../controllers/awards.controller");

// middleware
const validateUser = require("../middleware/validateUser");

router.post("/login", authController.login);
router.get("/awards", validateUser, awardsController.getAwards);

module.exports = router;
