const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");
const middleware = require("../middleware/jwt-middleware");

router.post("/login", loginController.login); //username and password in body

module.exports = router;
