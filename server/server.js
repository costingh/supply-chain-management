const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
dotenv.config({ path: "./.env" });

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// parse application/json
app.use(express.json());

// database
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) console.log(err);
  else console.log("Mysql connected...");
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/suppliers.routes")(app);
require("./app/routes/invoices.routes")(app);
require("./app/routes/employees.routes")(app);
require("./app/routes/categories.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/orders.routes")(app);
require("./app/routes/statistics.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
