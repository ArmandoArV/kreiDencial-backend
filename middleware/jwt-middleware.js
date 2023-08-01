const express = require("express");
const jwt = require("jsonwebtoken");
const util = require("util");
const config = require("../config/jwt");

const middleware = express.Router();

const jwtVerify = util.promisify(jwt.verify);

middleware.use(async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = await jwtVerify(token, config.key);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
});

module.exports = middleware;
