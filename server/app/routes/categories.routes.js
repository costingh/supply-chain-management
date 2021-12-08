const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/categorii/add", [authJwt.verifyToken], controller.addCategory);
  app.get(
    "/api/categorii/all",
    [authJwt.verifyToken],
    controller.getAllCategories
  );

  app.delete(
    "/api/categorii/delete/:name",
    [authJwt.verifyToken],
    controller.deleteCategory
  );

  app.post(
    "/api/categorii/update/:identifier",
    [authJwt.verifyToken],
    controller.updateCategory
  );
};
