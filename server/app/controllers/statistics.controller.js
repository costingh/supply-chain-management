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
