const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

const userController = {
  validateUser: async (req, res) => {
    try {
      const matricula = req.body.matricula;
      const result = await connection.query(
        "SELECT * FROM User WHERE matricula = ?",
        [matricula]
      );
      if (result.length > 0) {
        res.json({ message: "User exists" });
      } else {
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
};

module.exports = userController;
