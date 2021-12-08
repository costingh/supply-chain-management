const { authJwt } = require("../middleware");
const controller = require("../controllers/supplier.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/furnizori/add", [authJwt.verifyToken], controller.addSupplier);
  app.get(
    "/api/furnizori/all",
    [authJwt.verifyToken],
    controller.getAllSuppliers
  );

  app.delete(
    "/api/furnizori/delete/:name",
    [authJwt.verifyToken],
    controller.deleteSupplier
  );
};
