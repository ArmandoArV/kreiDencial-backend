const express = require("express");
const router = express.Router();
const eventoController = require("../controller/eventoController"); // Update the path accordingly
const middleware = require("../middleware/jwt-middleware");

// Define routes for evento operations
router.post("/eventos", middleware, eventoController.createEvento);
router.put("/eventos/:id", middleware, eventoController.updateEvento);
router.delete("/eventos/:id", middleware, eventoController.deleteEvento);

// Export the router
module.exports = router;
