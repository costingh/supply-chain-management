const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.getAllEmployees = (req, res) => {
  db.query(
    "SELECT *, d.nume_departament, d.id_manager FROM angajati a inner join departamente d on a.id_departament=d.id_departament ",
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.json({
          message: "Employees fetched successfully!",
          status: 200,
          employees: results,
        });
      } else {
        return res.send({
          message: "No employees in database!",
          status: 409,
        });
      }
    }
  );
};

exports.getProfile = (req, res) => {
  const { email } = req.params;

  db.query(
    "SELECT * FROM angajati WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.json({
          message: "Profile fetched successfully!",
          status: 200,
          profile: results,
        });
      } else {
        return res.send({
          message: "Error",
          status: 409,
        });
      }
    }
  );
};

exports.updateProfile = (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneNumber,
    ssn,
    street,
    houseNumber,
    county,
    city,
    sex,
    birthDate,
  } = req.body;
  const identifier = req.params.identifier;

  db.query(
    "SELECT * FROM angajati WHERE email = ?",
    [identifier],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        let prevUser = results[0];

        let queryString = "UPDATE angajati SET ";
        if (firstname !== prevUser.prenume && firstname !== "-")
          queryString += `prenume='${firstname}',`;
        if (lastname !== prevUser.nume && lastname !== "-")
          queryString += `nume='${lastname}',`;
        if (email !== prevUser.email && email !== "-")
          queryString += `email='${email}',`;
        if (phoneNumber !== prevUser.numar_telefon && phoneNumber !== "-")
          queryString += `numar_telefon='${phoneNumber}',`;
        if (ssn !== prevUser.CNP && ssn !== "-") queryString += `CNP='${ssn}',`;
        if (street !== prevUser.strada && street !== "-")
          queryString += `strada='${street}',`;
        if (houseNumber !== prevUser.numar && houseNumber !== "-")
          queryString += `numar='${houseNumber}',`;
        if (county !== prevUser.judet && county !== "-")
          queryString += `judet='${county}',`;
        if (city !== prevUser.oras && city !== "-")
          queryString += `oras='${city}',`;
        if (sex !== prevUser.sex && sex !== "-") queryString += `sex='${sex}',`;
        if (birthDate !== prevUser.data_nastere && birthDate !== "-")
          queryString += `data_nastere='${birthDate}',`;
        queryString = queryString.substring(0, queryString.length - 1);
        queryString += ` WHERE email = '${identifier}'`;

        db.query(queryString, async (error, results) => {
          if (error) {
            console.log(error);
          }

          return res.json({
            message: "Profil actualizat!",
            status: 200,
            profile: [
              {
                CNP: ssn === "-" ? null : ssn,
                data_nastere: birthDate === "-" ? null : birthDate,
                email: email === "-" ? null : email,
                judet: county !== "-" ? county : null,
                numar: houseNumber !== "-" ? houseNumber : null,
                numar_telefon: phoneNumber !== "-" ? phoneNumber : null,
                nume: lastname !== "-" ? lastname : null,
                oras: city !== "-" ? city : null,
                prenume: firstname !== "-" ? firstname : null,
                sex: sex,
                strada: street !== "-" ? street : null,
              },
            ],
          });
        });
      } else {
        return res.send({
          message: "Account not found!",
          status: 409,
        });
      }
    }
  );
};

exports.updateSalary = (req, res) => {
  const newSalary = req.body.salary;
  const email = req.params.email;

  db.query(
    "update angajati set salariu = ? where email = ?",
    [newSalary, email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.send({
          message: "Salariul nu a putut fi modificat!",
          status: 409,
        });
      } else {
        return res.json({
          message: "Salariu modificat!",
          status: 200,
          salary: newSalary,
          email: email,
        });
      }
    }
  );
};
