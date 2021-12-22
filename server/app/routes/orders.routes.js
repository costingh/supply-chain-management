const { authJwt } = require("../middleware");
const controller = require("../controllers/order.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/comenzi/add", [authJwt.verifyToken], controller.addOrder);
  app.get("/api/comenzi/all", [authJwt.verifyToken], controller.getAllOrders);

  app.get(
    "/api/comenzi/:number",
    [authJwt.verifyToken],
    controller.getOrderByNumber
  );

  /* app.delete(
    "/api/comenzi/delete/:name",
    [authJwt.verifyToken],
    controller.deleteOrder
  );

  app.post(
    "/api/comenzi/update/:identifier",
    [authJwt.verifyToken],
    controller.updateOrder
  ); */
};
