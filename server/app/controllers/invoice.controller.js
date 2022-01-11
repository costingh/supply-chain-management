const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.addInvoice = (req, res) => {
  const { nrComanda } = req.body;

  let query1 =
    "select c.cod_furnizor, " +
    "( " +
    "select sum(p.pret * pc.cantitate) " +
    "from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs " +
    "where nr_comanda = ? " +
    ") as total " +
    "from comenzi c where c.nr_comanda = ?";

  db.query(query1, [nrComanda, nrComanda], (error, results) => {
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
            "UPDATE comenzi SET nr_factura = ? where nr_comanda = ?",
            [results.insertId, nrComanda],
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
  let query =
    "select fa.nr_factura, fa.data_factura, fa.total, fu.nume_furnizor, fu.strada, fu.numar, fu.oras, fu.judet, fu.nr_telefon, d.nume_departament " +
    "from facturi fa inner join furnizori fu on fa.cod_furnizor = fu.cod_furnizor " +
    "inner join departamente d on fu.id_departament = d.id_departament " +
    "order by fa.data_factura desc";

  db.query(query, async (error, results) => {
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

exports.getAnInvoice = (req, res) => {
  let query =
    "select p.nume_produs, p.pret, p.unitate_masura, pc.cantitate " +
    "from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs " +
    "inner join comenzi c on pc.nr_comanda = c.nr_comanda " +
    "inner join facturi f on f.nr_factura = c.nr_factura " +
    "where f.nr_factura = ?";

  db.query(query, req.params.numar, async (error, results) => {
    if (error) {
      return res.send({
        message: "Eroare!",
        status: 409,
      });
    }

    if (results.length > 0) {
      return res.json({
        message: "Succes!",
        status: 200,
        products: results,
      });
    } else {
      return res.send({
        message: "Nu a fost gasita factura!",
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
