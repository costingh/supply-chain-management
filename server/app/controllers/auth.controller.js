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
          message: "That email is already in use!",
          status: 409,
        });
      } else if (password !== passwordConfirm) {
        return res.send({ message: "Passwords don't match!", status: 401 });
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
                message: "The phone number is already used!",
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
                message: "The SSN is already in our database!",
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
            message: "User Registered Successfully",
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

      // response example
      /* 
        nume: 'popescu',
        prenume: 'ion',
        parola: '$2a$10$G5YNcVGFBJpJF3WvGuLbEOxcyOTwEttOpm.kjhw5usgHKI7lb.CCy',
        email: 'popescu.ion@angajat.com',
        administrator: 'N',
        data_creare: 2021-10-27T13:33:20.000Z
      */

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
        //send response
        res.json({ user: results[0], token, status: 200 });
      } else {
        return res.send({ message: "Incorrect email!", status: 403 });
      }
    }
  );
};
