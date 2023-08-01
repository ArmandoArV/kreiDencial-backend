const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");
const { use } = require("../middleware/jwt-middleware");

const getUsers = async (req, res) => {
  const result = await connection.query("SELECT * FROM User");
  res.json(result);
};

const validateUser = async (req, res) => {
  const username = req.body.username;
  const result = await connection.query(
    "SELECT * FROM User WHERE username = ?",
    [username]
  );
  if (result.length > 0) {
    res.json({ message: "User exists" });
  } else {
    res.json({ message: "User does not exist" });
  }
};

const validateMatricula = async (req, res) => {
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
};

const registerUser = async (req, res) => {
  const { name, matricula, password } = req.body;

  const sql =
    "INSERT INTO User (name, matricula, password) VALUES (?, ?, SHA256(?, 256))";

  const token = jwt.sign({ name, matricula }, config.secret, {
    expiresIn: "1h",
  });

  connection.query(sql, [name, matricula, password], async (err, result) => {
    if (err) {
      res.json({ message: "Error" });
    } else {
      res.json({
        message: "User created",
        token,
      });
    }
  });
};

const getByMatricula = async (req, res) => {
  const matricula = req.params.matricula;
  const result = await connection.query(
    "SELECT * FROM User WHERE matricula = ?",
    [matricula]
  );
  res.json(result);
};

module.exports = {
  getUsers: use(getUsers),
  validateUser: use(validateUser),
  validateMatricula: use(validateMatricula),
  registerUser: use(registerUser),
  getByMatricula: use(getByMatricula),
};
