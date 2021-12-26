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

      let last_x_months = months.slice(
        new Date().getMonth() + 1 - monthsNo,
        new Date().getMonth() + 1
      );

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
        message: "Success",
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
    "select f.nume_furnizor " +
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