const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// connect to database
const db = mysql.createConnection(dbConfig);

// total cheltuit in fiecare luna (pe comenzi) timp de x luni
exports.totalSpentByMonth = (req, res) => {
  const monthsNo = req.params.numberOfMonths;

  let query =
    "select distinct month(c.data_comanda) as luna, " +
    "(select sum(p.pret * pc.cantitate) " +
    " from produse p inner join produsecomenzi pc on p.cod_produs = pc.cod_produs " +
    "inner join comenzi c2 on c2.nr_comanda = pc.nr_comanda " +
    `where month(c2.data_comanda) = month(c.data_comanda) and c.data_comanda > curdate() - interval (dayofmonth(curdate()) - 1) day - interval ${monthsNo} month ) as total ` +
    "from comenzi c " +
    "order by month(c.data_comanda) desc; ";
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

      for (let i = 0; i < last_x_months.length; i++)
        data.push({
          nume_luna: last_x_months[i],
          index_luna: months.indexOf(last_x_months[i]),
          total: 0,
        });

      results.map((res) => {
        for (let i = 0; i < last_x_months.length; i++)
          if (res.luna - 1 === data[i].index_luna)
            data[i].total = res.total ? res.total : 0;
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

// numar totatl de facturi
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

// numar totatl de comenzi
exports.numberOfOrders = (req, res) => {
  db.query(
    "select count(distinct nr_comanda) as total_comenzi from produsecomenzi",
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

// numar total de furnizori
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

// numar total de angajati
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

// furnizori de la care nu au fost cumparate produse
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

// orasul cu cei mai multi furnizori
exports.mostSupplierInACity = (req, res) => {
  let query =
    "select count(f1.oras) as furnizori_in_oras, f1.oras from furnizori f1 group by f1.oras having count(f1.oras) in ( select max(f.nr_furnizori) as furnizori_in_oras from (select count(*) as nr_furnizori, f.oras from furnizori f group by f.oras) f );";

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

// numar furnizori din fiecare oras
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

// cele mai populare produse dintr-o luna timp de x luni (in functie de cantitate)
exports.popularProducts = (req, res) => {
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

  let string = "";

  if (months.includes(req.params.name)) {
    string = `where s.luna = ${months.indexOf(req.params.name) + 1} `;
  }

  let query =
    "select max(s.cantitate_totala) as cantitate_lunara, s.produs as nume_produs, s.luna as luna, s.imagine_produs, s.pret as pret " +
    "from " +
    "( " +
    "select sum(pc.cantitate) as cantitate_totala, " +
    "month(pc.data_comanda) as luna, " +
    "p.nume_produs as produs, " +
    "p.imagine_produs as imagine_produs, " +
    "pc.data_comanda as data_completa, " +
    "p.pret as pret " +
    "from produsecomenzi pc inner join produse p on pc.cod_produs = p.cod_produs " +
    "group by month(pc.data_comanda), pc.cod_produs " +
    "order by month(pc.data_comanda) desc, sum(pc.cantitate) desc " +
    ") as s " +
    string +
    "group by s.luna " +
    "order by s.data_completa desc ";

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

// furnizorul de la care au fost cumparate cele mai multe produse
exports.favouriteSupplier = (req, res) => {
  let query =
    "select f.nume_furnizor, sum(pc.cantitate) as cantitate " +
    "from furnizori f " +
    "inner join produse p on p.cod_furnizor=f.cod_furnizor " +
    "inner join produsecomenzi pc on pc.cod_produs=p.cod_produs " +
    "group by f.nume_furnizor " +
    "having sum(pc.cantitate) IN " +
    "( select max(s.cantitate_totala) " +
    "from  (" +
    "select sum(pc2.cantitate) as cantitate_totala " +
    "from produsecomenzi pc2 inner join produse p2 on p2.cod_produs = pc2.cod_produs " +
    "inner join furnizori f2 on f2.cod_furnizor = p2.cod_furnizor " +
    "group by f2.nume_furnizor " +
    ") as s " +
    ")";

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

// cel mai ivarsta angajat care ale salariul mai mare decat cel al managerului departamentului din care face parte
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

// lista cu toate produsele de la fiecare furnizor in parte
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
