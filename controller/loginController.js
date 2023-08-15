const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const connection = require("../config/mysql-config");

module.exports.login = async (req, res) => {
  if (!req.body.matricula || !req.body.password) {
    res.status(400).json({ message: "Invalid body" });
    return;
  }

  const { matricula, password } = req.body;
  const sql =
    "SELECT * FROM User WHERE matricula = ? AND password = SHA2(?, 256)";

  try {
    const result = await connection.query(sql, [matricula, password]);

    if (result.length > 0) {
      const idUser = result[0].idUser;
      const isAdmin = result[0].isAdmin;

      const payload = { idUser, matricula, isAdmin };
      const token = jwt.sign(payload, config.key, { expiresIn: "2h" });

      res
        .status(200)
        .json({ message: "User logged in successfully", token, idUser });
    } else {
      res.status(401).json({ message: "Invalid matricula or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
