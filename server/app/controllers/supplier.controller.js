const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.addSupplier = (req, res) => {
  const { nume_furnizor, strada, numar, oras, judet, nr_telefon } = req.body;

  db.query(
    "SELECT nume_furnizor FROM furnizori WHERE nume_furnizor = ?",
    [nume_furnizor],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.send({
          message:
            "A supplier named " +
            nume_furnizor +
            " already exists in database!",
          status: 409,
        });
      }

      const Supplier = {
        nume_furnizor: nume_furnizor,
        id_departament: "4",
      };

      if (strada) Supplier.strada = strada;
      if (numar) Supplier.numar = numar;
      if (oras) Supplier.oras = oras;
      if (judet) Supplier.judet = judet;
      if (nr_telefon) Supplier.nr_telefon = nr_telefon;

      db.query("INSERT INTO furnizori SET ?", Supplier, (error, results) => {
        if (error) console.log(error);
        else {
          return res.json({
            message: "Supplier added successfully!",
            status: 200,
            supplier: Supplier,
          });
        }
      });
    }
  );
};

exports.getAllSuppliers = (req, res) => {
  db.query("SELECT * FROM furnizori", async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Suppliers fetched successfully!",
        status: 200,
        suppliers: results,
      });
    } else {
      return res.send({
        message: "No suppliers in database!",
        status: 409,
      });
    }
  });
};

exports.deleteSupplier = (req, res) => {
  const supplierToDeleteName = req.params.name;

  db.query(
    "DELETE FROM furnizori WHERE nume_furnizor = ?",
    [supplierToDeleteName],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      return res.json({
        message: "Supplier deleted successfully!",
        status: 200,
      });
    }
  );
};

exports.getAllSupplierNames = (req, res) => {
  db.query("SELECT nume_furnizor FROM furnizori", async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Suppliers fetched successfully!",
        status: 200,
        supplierNames: results,
      });
    } else {
      return res.send({
        message: "No suppliers in database!",
        status: 409,
      });
    }
  });
};
