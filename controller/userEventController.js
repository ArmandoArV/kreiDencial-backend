const connection = require("../config/mysql-config");

const userEventoController = {
  addUserToEvento: async (req, res) => {
    try {
      const { userId, eventoId } = req.body;
      const { points } = req.body;

      const sql =
        "INSERT INTO User_has_Evento (User_idUser, Evento_idEvento) VALUES (?, ?)";
      await connection.query(sql, [userId, eventoId]);

      const updatePointsSql = "UPDATE Evento SET points = ? WHERE idEvento = ?";
      await connection.query(updatePointsSql, [points, eventoId]);

      res.json({ message: "User added to event" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getEventsForUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const sql = `
        SELECT e.idEvento, e.eventName, e.eventCode, e.isActive
        FROM Evento e
        INNER JOIN User_has_Evento ue ON e.idEvento = ue.Evento_idEvento
        WHERE ue.User_idUser = ?
      `;

      const events = await connection.query(sql, [userId]);

      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllUsersWithSpecificEvent: async (req, res) => {
    try {
      const eventoId = req.params.eventoId;

      const sql = `
        SELECT u.idUser, u.name, u.lastName, u.matricula
        FROM User u
        INNER JOIN User_has_Evento ue ON u.idUser = ue.User_idUser
        WHERE ue.Evento_idEvento = ?
      `;

      const users = await connection.query(sql, [eventoId]);

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteEventFromUser: async (req, res) => {
    try {
      const { userId, eventoId } = req.body;

      const sql =
        "DELETE FROM User_has_Evento WHERE User_idUser = ? AND Evento_idEvento = ?";
      await connection.query(sql, [userId, eventoId]);

      res.json({ message: "Event deleted from user" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  countEventsForUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const sql = `
        SELECT COUNT(*) AS eventCount
        FROM User_has_Evento
        WHERE User_idUser = ?
      `;

      const result = await connection.query(sql, [userId]);
      const eventCount = result[0].eventCount;

      res.json({ eventCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // New functions for additional routes

  updateEventPoints: async (req, res) => {
    try {
      const { eventId } = req.params;
      const { points } = req.body;

      const sql = "UPDATE Evento SET points = ? WHERE idEvento = ?";
      await connection.query(sql, [points, eventId]);

      res.json({ message: "Event points updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getEventDetails: async (req, res) => {
    try {
      const { eventId } = req.params;

      const sql = "SELECT * FROM Evento WHERE idEvento = ?";
      const event = await connection.query(sql, [eventId]);

      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getUsersWithMostEvents: async (req, res) => {
    try {
      const sql = `
        SELECT u.idUser, u.name, u.lastName, u.matricula, COUNT(ue.User_idUser) AS eventCount
        FROM User u
        INNER JOIN User_has_Evento ue ON u.idUser = ue.User_idUser
        GROUP BY u.idUser
        ORDER BY eventCount DESC
      `;

      const users = await connection.query(sql);

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getUsersWithPointsAboveThreshold: async (req, res) => {
    try {
      const { threshold } = req.params;

      const sql = `
        SELECT u.idUser, u.name, u.lastName, u.matricula, e.points
        FROM User u
        INNER JOIN User_has_Evento ue ON u.idUser = ue.User_idUser
        INNER JOIN Evento e ON ue.Evento_idEvento = e.idEvento
        WHERE e.points > ?
      `;

      const users = await connection.query(sql, [threshold]);

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getActiveEvents: async (req, res) => {
    try {
      const sql = "SELECT * FROM Evento WHERE isActive = 1";
      const events = await connection.query(sql);

      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userEventoController;
