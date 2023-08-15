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
      const { eventName, eventCode, isActive } = req.body;

      const sql =
        "INSERT INTO Evento (eventName, eventCode, isActive) VALUES (?, ?, ?)";

      await connection.query(sql, [eventName, eventCode, isActive]);

      res.json({ message: "Event created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateEvento: async (req, res) => {
    try {
      const idEvento = req.params.idEvento;
      const { eventName, eventCode, isActive } = req.body;

      const sql =
        "UPDATE Evento SET eventName = ?, eventCode = ?, isActive = ? WHERE idEvento = ?";

      await connection.query(sql, [eventName, eventCode, isActive, idEvento]);

      res.json({ message: "Event updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteEvento: async (req, res) => {
    try {
      const idEvento = req.params.idEvento;

      const sql = "DELETE FROM Evento WHERE idEvento = ?";

      await connection.query(sql, [idEvento]);

      res.json({ message: "Event deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  checkIfEventIsActive: async (req, res) => {
    try {
      const eventCode = req.body.eventCode;
      const sql = "SELECT isActive FROM Evento WHERE eventCode = ?";

      const result = await connection.query(sql, [eventCode]);

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = eventoController;
