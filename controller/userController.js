const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const userController = {
  validateUser: async (req, res) => {
    try {
      const matricula = req.body.matricula;
      const sql = "SELECT * FROM User WHERE matricula = ?";
      console.log("SQL Query:", sql);

      const result = await connection.query(sql, [matricula]);
      console.log("Query Result:", result);

      const userExists = result[0].length > 0; // Check if there are any rows

      if (userExists) {
        console.log(`User with matricula ${matricula} exists.`);
        res.json({ message: "User exists" });
      } else {
        console.log(`User with matricula ${matricula} does not exist.`);
        res.json({ message: "User does not exist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { name, lastName, matricula, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const sql =
        "INSERT INTO User (name, lastName, matricula, password) VALUES (?, ?, ?, ?)";

      const caseSensitive = false; // This is the property that was missing

      await connection.query(sql, [name, lastName, matricula, hashedPassword]);

      res.json({
        message: "User created",
        caseSensitive,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await connection.query("SELECT * FROM User");
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const deleteResult = await connection.query(
        "DELETE FROM User WHERE idUser = ?",
        [userId]
      );

      if (deleteResult.affectedRows > 0) {
        res.json({ message: "User deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { name, lastName, matricula } = req.body;

      const sql =
        "UPDATE User SET name = ?, lastName = ?, matricula = ? WHERE idUser = ?";

      const updateResult = await connection.query(sql, [
        name,
        lastName,
        matricula,
        userId,
      ]);

      if (updateResult.affectedRows > 0) {
        res.json({ message: "User updated" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateUserAdminStatus: async (req, res) => {
    try {
      const userId = req.params.userId;
      const isAdmin = req.body.isAdmin;

      const sql = "UPDATE User SET isAdmin = ? WHERE idUser = ?";
      await connection.query(sql, [isAdmin, userId]);

      res.json({ message: "User admin status updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getUserTotalPoints: async (req, res) => {
    try {
      const userId = req.params.userId;

      const sql = `
        SELECT u.name, u.lastName, u.matricula, SUM(e.points) AS totalPoints
        FROM User u
        LEFT JOIN User_has_Evento ue ON u.idUser = ue.User_idUser
        LEFT JOIN Evento e ON ue.Evento_idEvento = e.idEvento
        WHERE u.idUser = ?
        GROUP BY u.idUser
      `;

      const result = await connection.query(sql, [userId]);

      console.log("Query Result:", result);

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userData = result[0]; // Change this line

      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
