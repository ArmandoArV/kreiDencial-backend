const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing
const config = require("../config/jwt");
const connection = require("../config/mysql-config");
const { use } = require("../middleware/jwt-middleware");

const getUsers = async (req, res) => {
  try {
    const result = await connection.query("SELECT * FROM User");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const validateUser = async (req, res) => {
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
};

const validateMatricula = async (req, res) => {
  try {
    const matricula = req.body.matricula;
    const result = await connection.query(
      "SELECT * FROM User WHERE matricula = ?",
      [matricula]
    );
    if (result.length > 0) {
      res.json({ message: "Matricula exists" });
    } else {
      res.json({ message: "Matricula does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, lastName, matricula, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const sql =
      "INSERT INTO User (name, lastName, matricula, password) VALUES (?, ?, ?, ?)";

    const token = jwt.sign({ name, matricula }, config.secret, {
      expiresIn: "1h",
    });

    await connection.query(sql, [name, lastName, matricula, hashedPassword]);

    res.json({
      message: "User created",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getByMatricula = async (req, res) => {
  try {
    const matricula = req.params.matricula;
    const result = await connection.query(
      "SELECT * FROM User WHERE matricula = ?",
      [matricula]
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUsers: use(getUsers),
  validateUser: use(validateUser),
  validateMatricula: use(validateMatricula),
  registerUser: use(registerUser),
  getByMatricula: use(getByMatricula),
};
