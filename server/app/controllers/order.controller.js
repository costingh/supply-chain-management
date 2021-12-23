const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.addOrder = (req, res) => {
  const { cod_furnizor, data_livrare, listaProduse } = req.body;

  const Order = {
    cod_furnizor: cod_furnizor,
    data_livrare: new Date(data_livrare),
  };

  let query = "INSERT INTO comenzi SET ?";

  db.query(query, Order, async (error, results) => {
    if (error) {
      console.log(error);
      return res.send({
        message: "Eroare la plasarea comenzii!",
        status: 500,
      });
    } else {
      const nr_comanda = results.insertId;
      let success = true;

      Promise.all(
        listaProduse.map((product) => {
          const ProduseComenzi = {
            nr_comanda: nr_comanda,
            cod_produs: product.cod_produs,
            cantitate: product.cantitate,
          };

          let q = "INSERT INTO produsecomenzi SET ?";

          db.query(q, ProduseComenzi, async (error, results) => {
            if (error) success = false;
            else {
              db.query(
                "UPDATE produse SET stoc_initial = ? WHERE cod_produs = ?",
                [product.stoc_initial - product.cantitate, product.cod_produs],
                async (error, results) => {
                  if (error) console.log(error);
                }
              );
            }
          });
        })
      );

      if (success) {
        return await res.json({
          message: "Comanda plasata!",
          status: 200,
          order: results,
        });
      } else {
        return await res.json({
          message: "Eroare!",
          status: 500,
          order: results,
        });
      }
    }
  });
};

exports.getAllOrders = (req, res) => {
  let query =
    "select distinct c.nr_comanda, c.data_comanda, c.data_livrare, c.nr_factura, f.*, " +
    "(select sum(p.pret * pc.cantitate) from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs where nr_comanda = c.nr_comanda) as total " +
    "from comenzi c inner join produsecomenzi pc on c.nr_comanda = pc.nr_comanda " +
    "inner join furnizori f on f.cod_furnizor = c.cod_furnizor " +
    "order by c.data_comanda desc";

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

exports.deleteOrder = (req, res) => {
  const nr_comanda = req.params.nr;
  // daca anulam o comanda, sa updatam stoc_initial din recordurile - produsecomenzi
  // select * from produsecomenzi where nr_comanda = nr_comanda
  // Promise.all(results.map(res => update produse set stoc_initial = stoc_initial + ap.cantitate where cod_produs = pc.cod_produs ))
  db.query(
    "SELECT * FROM produsecomenzi WHERE nr_comanda = ?",
    [nr_comanda],
    async (error, results) => {
      if (error) {
        return res.json({
          message: "Comanda nu a putut fi anulata!",
          status: 500,
        });
      } else {
        Promise.all(
          results.map((res) => {
            db.query(
              "UPDATE produse SET stoc_initial = stoc_initial + ? WHERE cod_produs = ?",
              [res.cantitate, res.cod_produs],
              async (error, results) => {
                if (error) console.log(error);
              }
            );
          })
        );
        db.query(
          "DELETE FROM comenzi WHERE nr_comanda = ?",
          [nr_comanda],
          async (error, results) => {
            if (error) {
              console.log(error);
              return res.json({
                message: "Comanda nu a putut fi anulata!",
                status: 500,
              });
            }

            return res.json({
              message: "Comanda a fost anulata!",
              status: 200,
            });
          }
        );
      }
    }
  );
};
