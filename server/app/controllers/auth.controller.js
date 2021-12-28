const mysql = require("mysql");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.signup = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    ssn,
    street,
    houseNumber,
    county,
    city,
    sex,
    birthDate,
  } = req.body;

  let administrator = "N";

  // Save User to Database
  if (email.includes("@admin.com") || email.includes("@administrator.com")) {
    administrator = "D"; // set administrator role
  }

  // check if email is unique
  db.query(
    "SELECT email FROM angajati WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.send({
          message: "Acest email este deja folosit!",
          status: 409,
        });
      } else if (password !== passwordConfirm) {
        return res.send({ message: "Parolele nu se potrivesc!", status: 401 });
      }

      // check if phone number is unique if exists
      if (phoneNumber) {
        db.query(
          "SELECT numar_telefon FROM angajati WHERE numar_telefon = ?",
          [phoneNumber],
          async (error, results) => {
            if (error) {
              console.log(error);
            }

            if (results.length > 0) {
              return res.send({
                message: "Numarul de telefon este folosit!",
                status: 410,
              });
            }
          }
        );
      }

      // check if phone SSN is unique if exists
      if (ssn) {
        db.query(
          "SELECT CNP FROM angajati WHERE CNP = ?",
          [ssn],
          async (error, results) => {
            if (error) {
              console.log(error);
            }

            if (results.length > 0) {
              return res.send({
                message: "CNP-ul exista in baza de date!",
                status: 411,
              });
            }
          }
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const User = {
        nume: lastname,
        prenume: firstname,
        email: email,
        parola: hashedPassword,
        administrator: administrator,
        id_departament: "4",
      };

      if (phoneNumber) User.numar_telefon = phoneNumber;
      if (ssn) User.CNP = ssn;
      if (street) User.strada = street;
      if (houseNumber) User.numar = houseNumber;
      if (county) User.judet = county;
      if (city) User.oras = city;
      if (sex) User.sex = sex;
      if (birthDate) User.data_nastere = birthDate;

      db.query("INSERT INTO angajati SET ?", User, (error, results) => {
        if (error) console.log(error);
        else {
          return res.json({
            message: "Cont creat cu succes!",
            status: 200,
          });
        }
      });
    }
  );
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  //find user
  db.query(
    "SELECT * FROM angajati WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        //validate password
        const validPassword = await bcrypt.compare(password, results[0].parola);

        if (!validPassword)
          return res.send({ message: "Incorrect password!", status: 403 });

        const token = jwt.sign(
          { id: results[0].id_angajat },
          process.env.JWT_SECRET,
          { expiresIn: "3h" }
        );
        res.json({ user: results[0], token, status: 200 });
      } else {
        return res.send({ message: "Email incorect!", status: 403 });
      }
    }
  );
};
