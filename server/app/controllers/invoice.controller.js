const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.addInvoice = (req, res) => {
  const { cod_furnizor, total } = req.body;

  const Invoice = {
    cod_furnizor: cod_furnizor,
    total: total,
  };

  db.query("INSERT INTO facturi SET ?", Invoice, (error, results) => {
    if (error) console.log(error);
    else {
      return res.json({
        message: "Invoice added successfully!",
        status: 200,
        invoice: Invoice,
      });
    }
  });
};

exports.getAllInvoices = (req, res) => {
  db.query("SELECT * FROM facturi", async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Invoices fetched successfully!",
        status: 200,
        invoices: results,
      });
    } else {
      return res.send({
        message: "No invoices in database!",
        status: 409,
      });
    }
  });
};

exports.deleteInvoice = (req, res) => {
  const numarFactura = req.params.id;

  db.query(
    "DELETE FROM facturi WHERE nr_factura = ?",
    [numarFactura],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      return res.json({
        message: "Invoice deleted successfully!",
        status: 200,
      });
    }
  );
};
