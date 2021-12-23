const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/produse/add", [authJwt.verifyToken], controller.addProduct);
  app.get("/api/produse/all", [authJwt.verifyToken], controller.getAllProducts);

  app.get(
    "/api/produse/search",
    [authJwt.verifyToken],
    controller.searchForProduct
  );

  app.delete(
    "/api/produse/delete/:name",
    [authJwt.verifyToken],
    controller.deleteProduct
  );

  app.post(
    "/api/produse/update/:identifier",
    [authJwt.verifyToken],
    controller.updateProduct
  );
};
