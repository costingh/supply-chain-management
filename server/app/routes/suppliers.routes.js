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
  app.post(
    "/api/furnizori/update/:id",
    [authJwt.verifyToken],
    controller.updateSupplier
  );

  app.get(
    "/api/furnizori/all",
    [authJwt.verifyToken],
    controller.getAllSuppliers
  );

  app.get(
    "/api/furnizori/all-names",
    [authJwt.verifyToken],
    controller.getAllSupplierNames
  );

  app.get(
    "/api/furnizori/get-supplier/:suppName",
    [authJwt.verifyToken],
    controller.getSupplierByName
  );

  app.delete(
    "/api/furnizori/delete/:name",
    [authJwt.verifyToken],
    controller.deleteSupplier
  );
};
