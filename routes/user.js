const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/", userController.getUsers);
router.get("/matricula", userController.getByMatricula);
router.post("/register", userController.registerUser);
router.post("/validateUser", userController.validateUser);
router.post("/validateMatricula", userController.validateMatricula);

module.exports = router;
