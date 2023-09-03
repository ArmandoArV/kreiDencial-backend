const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const leaderboardController = {
  getLeaderboard: async (req, res) => {
    try {
      const sql = `
          SELECT u.name, u.lastName, u.matricula, SUM(e.points) AS totalPoints
          FROM User u
          LEFT JOIN User_has_Evento ue ON u.idUser = ue.User_idUser
          LEFT JOIN Evento e ON ue.Evento_idEvento = e.idEvento
          GROUP BY u.idUser
          ORDER BY totalPoints DESC
        `;

      const leaderboard = await connection.query(sql);

      res.json(leaderboard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = leaderboardController;
