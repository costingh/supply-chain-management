const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.addInvoice = (req, res) => {
  const { nrComanda } = req.body;

  let query1 =
    "select distinct " +
    "c.cod_furnizor, (select sum(p.pret * pc.cantitate) from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs where nr_comanda = ?) as total " +
    "from comenzi c, produse p, produsecomenzi pc";

  db.query(query1, nrComanda, (error, results) => {
    if (error) {
      return res.json({
        message: "Comanda nu a putut fi gasita!",
        status: 404,
        invoice: null,
      });
    }

    if (results.length > 0) {
      let Factura = {
        cod_furnizor: results[0].cod_furnizor,
        total: results[0].total,
      };
      db.query("INSERT INTO facturi set ?", Factura, (error, results) => {
        if (error) {
          return res.json({
            message: "Eroare la generarea facturii!",
            status: 500,
            invoice: null,
          });
        } else {
          db.query(
            "UPDATE comenzi SET nr_factura = ?",
            results.insertId,
            (error, results) => {
              if (error) {
                return res.json({
                  message: "Eroare!",
                  status: 400,
                  invoice: null,
                });
              } else {
                return res.json({
                  message: "Factura generata cu succes!",
                  status: 200,
                  invoice: Factura,
                });
              }
            }
          );
        }
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
