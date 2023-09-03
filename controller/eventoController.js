const connection = require("../config/mysql-config");
const { use } = require("../middleware/jwt-middleware");

const eventoController = {
  getEventos: async (req, res) => {
    try {
      const result = await connection.query("SELECT * FROM Evento");
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  validateEvento: async (req, res) => {
    try {
      const eventName = req.body.eventName;
      const result = await connection.query(
        "SELECT * FROM Evento WHERE eventName = ?",
        [eventName]
      );
      if (result.length > 0) {
        res.json({ message: "Event exists" });
      } else {
        res.json({ message: "Event does not exist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createEvento: async (req, res) => {
    try {
      const { eventName, eventCode, isActive, points } = req.body;

      const sql =
        "INSERT INTO Evento (eventName, eventCode, isActive, points) VALUES (?, ?, ?, ?)";

      await connection.query(sql, [eventName, eventCode, isActive, points]);

      res.json({ message: "Event created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateEvento: async (req, res) => {
    try {
      const idEvento = req.params.id;
      const { isActive } = req.body;

      // Convert isActive to a number (0 or 1)
      const isActiveNumber = Number(isActive);

      // Check if the new isActive value is different from the existing value in the database
      const existingEvent = await connection.query(
        "SELECT isActive FROM Evento WHERE idEvento = ?",
        [idEvento]
      );

      if (existingEvent.length === 0) {
        console.log(`No event with idEvento ${idEvento} found.`);
        return res.status(404).json({ message: "Event not found" });
      }

      const currentIsActive = existingEvent[0].isActive;

      if (isActiveNumber === currentIsActive) {
        console.log(
          `Event with idEvento ${idEvento} already has the same isActive value.`
        );
        return res.json({ message: "Event isActive is already up-to-date" });
      }

      const sql = "UPDATE Evento SET isActive = ? WHERE idEvento = ?";
      await connection.query(sql, [isActiveNumber, idEvento]);

      console.log(`Event with idEvento ${idEvento} updated successfully.`);
      res.json({ message: "Event isActive updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteEvento: async (req, res) => {
    try {
      const idEvento = req.params.id;

      console.log("Deleting event with idEvento:", idEvento);

      const sql = "DELETE FROM Evento WHERE idEvento = ?";
      console.log("DELETE SQL:", sql);

      let result;
      try {
        result = await connection.query(sql, [idEvento]);
        console.log("Database delete result:", result);
      } catch (error) {
        console.error("Database error:", error);
        throw error;
      }

      if (result.affectedRows > 0) {
        console.log(`Event with idEvento ${idEvento} deleted successfully.`);
        res.json({ message: "Event deleted" });
      } else {
        console.log(`No event with idEvento ${idEvento} found.`);
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllEventos: async (req, res) => {
    try {
      const result = await connection.query("SELECT * FROM Evento");
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updatePoints: async (req, res) => {
    try {
      const idEvento = req.params.id;
      const { points } = req.body;

      const sql = "UPDATE Evento SET points = ? WHERE idEvento = ?";
      await connection.query(sql, [points, idEvento]);

      res.json({ message: "Event points updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = eventoController;
