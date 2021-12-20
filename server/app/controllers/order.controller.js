const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.getAllOrders = (req, res) => {
  let query =
    "select distinct c.nr_comanda, c.data_comanda, c.data_livrare, c.nr_factura, f.*, " +
    "(select sum(p.pret * pc.cantitate) from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs where nr_comanda = c.nr_comanda) as total " +
    "from comenzi c inner join produsecomenzi pc on c.nr_comanda = pc.nr_comanda " +
    "inner join furnizori f on f.cod_furnizor = c.cod_furnizor";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Orders fetched successfully!",
        status: 200,
        orders: results,
      });
    } else {
      return res.send({
        message: "No orders in database!",
        status: 409,
      });
    }
  });
};

exports.getOrderByNumber = (req, res) => {
  let orderNumber = req.params.number;

  let queryDetaliiComanda =
    "select f.nume_furnizor, c.data_comanda, c.data_livrare, c.nr_factura " +
    "from comenzi c inner join furnizori f on f.cod_furnizor = c.cod_furnizor " +
    `where c.nr_comanda = ${orderNumber}`;

  let queryProduseComandate =
    "select pc.cantitate, p.unitate_masura, p.nume_produs, p.descriere_produs, c.nume_categorie, p.imagine_produs, p.pret " +
    "from produsecomenzi pc inner join produse p on pc.cod_produs = p.cod_produs " +
    "inner join categorii c on p.categorie = c.id_categorie " +
    `where pc.nr_comanda = ${orderNumber}`;

  let response = [];

  db.query(queryDetaliiComanda, async (error, results) => {
    if (error) console.log(error);
    if (results.length > 0) {
      response.push(results);
      db.query(queryProduseComandate, async (error, results) => {
        if (error) console.log(error);
        if (results.length > 0) {
          response.push(results);
          console.log(response);

          if (response.length > 0) {
            return res.json({
              message: "Success",
              status: 200,
              comanda: response,
            });
          } else {
            return res.send({
              message: "Error trying to fetch order!",
              status: 409,
            });
          }
        }
      });
    }
  });
};
