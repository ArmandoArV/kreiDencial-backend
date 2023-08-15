const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const middleware = require("../middleware/jwt-middleware");

router.post("/register", middleware, userController.registerUser);
router.post("/validateUser", middleware, userController.validateUser);

module.exports = router;
