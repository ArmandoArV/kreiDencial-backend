const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const middleware = require("../middleware/jwt-middleware");

router.post("/register", userController.registerUser);
router.post("/validateUser", middleware, userController.validateUser);
router.get("/users", middleware, userController.getAllUsers);
router.put("/updateUser/:userId", middleware, userController.updateUser);
router.delete("/deleteUser/:userId", middleware, userController.deleteUser);
router.put("/users/:userId/admin", middleware, userController.updateUserAdminStatus);
router.get("/users/:userId/totalPoints", middleware, userController.getUserTotalPoints);

module.exports = router;
