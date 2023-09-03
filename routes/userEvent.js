const express = require("express");
const router = express.Router();
const userEventoController = require("../controller/userEventController");
const middleware = require("../middleware/jwt-middleware");

// Define routes for user-event interactions
router.post(
  "/user-event/add",
  middleware,
  userEventoController.addUserToEvento
);

router.get(
  "/user-event/:userId/events",
  middleware,
  userEventoController.getEventsForUser
);

router.delete(
  "/user-event/:userId/event/:eventId",
  middleware,
  userEventoController.deleteEventFromUser
);

router.get(
  "/user-event/:userId/event-count",
  middleware,
  userEventoController.countEventsForUser
);

router.get(
  "/event/:eventId/users",
  middleware,
  userEventoController.getAllUsersWithSpecificEvent
);

router.put(
  "/event/:eventId/points",
  middleware,
  userEventoController.updateEventPoints
);

router.get(
  "/event/:eventId/details",
  middleware,
  userEventoController.getEventDetails
);

router.get(
  "/users/most-events",
  middleware,
  userEventoController.getUsersWithMostEvents
);

router.get(
  "/users/points-above/:threshold",
  middleware,
  userEventoController.getUsersWithPointsAboveThreshold
);

router.get("/events/active", middleware, userEventoController.getActiveEvents);

// Export the router
module.exports = router;
