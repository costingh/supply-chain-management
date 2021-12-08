const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const dbConfig = require("../config/db.config");
const mysql = require("mysql");

// connect to database
const db = mysql.createConnection(dbConfig);

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  db.query(
    "SELECT administrator FROM angajati WHERE id_angajat = ?",
    [req.userId],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        if (results[0].administrator === "D") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    }
  );
};

isEmployee = (req, res, next) => {
  db.query(
    "SELECT administrator FROM angajati WHERE id_angajat = ?",
    [req.userId],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        if (results[0].administrator === "N") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Employee!",
      });
      return;
    }
  );
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isEmployee: isEmployee,
};
module.exports = authJwt;
