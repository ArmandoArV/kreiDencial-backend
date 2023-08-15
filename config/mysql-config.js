const mysql = require("mysql2/promise");

const config = {
  connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,

  password: process.env.DBPASSWORD,
  database: "kreidencial",
  debug: false,
  port: 3306,
};

const localConfig = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "kreidencial",
  debug: false,
  port: 3306,
};

const connection = mysql.createPool(localConfig);

connection.getConnection((err, connec) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  } else {
    console.log("Connection established");
    connec.release();
  }
});

module.exports = connection;