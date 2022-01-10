const { authJwt } = require("../middleware");
const controller = require("../controllers/invoice.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/facturi/add", [authJwt.verifyToken], controller.addInvoice);

  app.get("/api/facturi/all", [authJwt.verifyToken], controller.getAllInvoices);

  app.get(
    "/api/facturi/factura/:numar",
    [authJwt.verifyToken],
    controller.getAnInvoice
  );

  app.delete(
    "/api/facturi/delete/:id",
    [authJwt.verifyToken],
    controller.deleteInvoice
  );
};
