const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

exports.totalSpentByMonth = (req, res) => {
  const monthsNo = req.params.numberOfMonths;

  let query =
    "select distinct month(c.data_comanda) as luna,  " +
    "(select sum(p.pret * pc.cantitate) " +
    "from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs " +
    "where month(c.data_comanda) = month(pc.data_comanda)  ) as total " +
    "from produsecomenzi pc, comenzi c " +
    `where c.data_comanda > curdate() - interval (dayofmonth(curdate()) - 1) day - interval ${monthsNo} month ` +
    "order by month(c.data_comanda) desc ";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      let data = [];

      const months = [
        "Ianuarie",
        "Februarie",
        "Martie",
        "Aprilie",
        "Mai",
        "Iunie",
        "Iulie",
        "August",
        "Septembrie",
        "Octombrie",
        "Noiembrie",
        "Decembrie",
      ];

      let last_x_months = [];

      if (new Date().getMonth() + 1 - monthsNo > 0) {
        last_x_months = months.slice(
          new Date().getMonth() + 1 - monthsNo,
          new Date().getMonth() + 1
        );
      } else {
        let currentMonth = new Date().getMonth() + 1;

        for (let i = 0; i < monthsNo; i++) {
          if (currentMonth - i > 0) {
            last_x_months.push(months[i]);
          } else {
            last_x_months.push(months[months.length - i]);
          }
        }
        last_x_months = last_x_months.reverse();
      }

      console.log(new Date().getMonth() + 1 - monthsNo);

      for (let i = 0; i < last_x_months.length; i++)
        data.push({
          nume_luna: last_x_months[i],
          index_luna: months.indexOf(last_x_months[i]),
          total: 0,
        });

      results.map((res) => {
        for (let i = 0; i < last_x_months.length; i++)
          if (res.luna - 1 === data[i].index_luna) data[i].total = res.total;
      });
      return res.json({
        message: "Success!",
        status: 200,
        result: data,
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};

exports.numberOfInvoices = (req, res) => {
  db.query("select count(*) from facturi", async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results,
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};

exports.numberOfInvoices = (req, res) => {
  db.query(
    "select count(*) as total_facturi from facturi",
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.json({
          message: "Success!",
          status: 200,
          result: results[0],
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

exports.numberOfOrders = (req, res) => {
  db.query(
    "select count(*) as total_comenzi from comenzi",
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.json({
          message: "Success!",
          status: 200,
          result: results[0],
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

exports.numberOfInvoices = (req, res) => {
  db.query(
    "select count(*) as total_facturi from facturi",
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.json({
          message: "Success!",
          status: 200,
          result: results[0],
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

exports.numberOfSuppliers = (req, res) => {
  db.query(
    "select count(*) as total_furnizori from furnizori",
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.json({
          message: "Success!",
          status: 200,
          result: results[0],
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

exports.numberOfEmployees = (req, res) => {
  db.query(
    "select count(*) as total_angajati from angajati where administrator = 'N'",
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.json({
          message: "Success!",
          status: 200,
          result: results[0],
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

exports.suppliersWIthNoProductsBought = (req, res) => {
  let query =
    "select f.nume_furnizor, f.nr_telefon, f.oras " +
    "from furnizori f " +
    "where f.cod_furnizor not in " +
    "(select f2.cod_furnizor from furnizori f2 " +
    "inner join produse p on p.cod_furnizor = f2.cod_furnizor " +
    "inner join produsecomenzi pc on pc.cod_produs = p.cod_produs) ";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results,
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};

exports.mostSupplierInACity = (req, res) => {
  let query =
    "SELECT MAX(f.nr_furnizori) as furnizori_in_oras, f.oras " +
    "FROM (SELECT COUNT(*) AS nr_furnizori, f.oras FROM furnizori f group by f.oras) f";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results[0],
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};

exports.suppliersByCity = (req, res) => {
  let query =
    "SELECT COUNT(*) AS nr_furnizori, oras FROM furnizori f group by f.oras";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results,
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};

exports.popularProducts = (req, res) => {
  let query =
    "select p.nume_produs, p.pret, p.imagine_produs, sum(pc.cantitate) as cantitate_lunara, month(pc.data_comanda) as luna " +
    "from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs " +
    "group by p.nume_produs, month(pc.data_comanda) " +
    "having sum(pc.cantitate) >ANY (select sum(pc2.cantitate) from produse p2 inner join produsecomenzi pc2 on p2.cod_produs = pc2.cod_produs group by p2.nume_produs, month(pc2.data_comanda)) " +
    "order by month(pc.data_comanda) desc";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results,
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};

exports.favouriteSupplier = (req, res) => {
  let query =
    "select f.nume_furnizor, sum(pc.cantitate) as cantitate, month(pc.data_comanda) as luna " +
    "from furnizori f inner join produse p on p.cod_furnizor=f.cod_furnizor inner join produsecomenzi pc on pc.cod_produs=p.cod_produs group by month(pc.data_comanda) having sum(pc.cantitate) >ANY " +
    "(select sum(pc2.cantitate) from produsecomenzi pc2 inner join produse p2 on p2.cod_produs = pc2.cod_produs group by month(pc2.data_comanda))";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results[0],
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};

exports.bestEmployee = (req, res) => {
  let query =
    "select a.nume, a.prenume, a.salariu, a.data_nastere from angajati a inner join departamente d on d.id_departament = a.id_departament where a.salariu >ANY (select max(salariu) from angajati where id_angajat = d.id_manager) order by a.data_nastere asc limit 1";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results[0],
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};
exports.suppliersWithNoOrders = (req, res) => {
  let query =
    "select f.nume_furnizor, f.nr_telefon, f.oras " +
    "from furnizori f " +
    "where f.cod_furnizor not in " +
    "(select f2.cod_furnizor " +
    "from furnizori f2 " +
    "inner join produse p on p.cod_furnizor = f2.cod_furnizor " +
    "inner join produsecomenzi pc on pc.cod_produs = p.cod_produs)";

  db.query(query, async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results,
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};
exports.listOfProductsFromSupplier = (req, res) => {
  let nume_furnizor = req.params.furnizor;

  let query =
    "select p.nume_produs from produse p inner join furnizori f on p.cod_furnizor = f.cod_furnizor where f.nume_furnizor like ?";

  db.query(query, [nume_furnizor], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.json({
        message: "Success!",
        status: 200,
        result: results,
      });
    } else {
      return res.send({
        message: "Error",
        status: 409,
      });
    }
  });
};
