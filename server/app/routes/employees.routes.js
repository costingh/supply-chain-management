const { authJwt } = require("../middleware");
const controller = require("../controllers/employee.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/angajati/all",
    [authJwt.verifyToken],
    controller.getAllEmployees
  );

  app.get(
    "/api/angajati/profil/:email",
    [authJwt.verifyToken],
    controller.getProfile
  );

  app.post(
    "/api/angajati/profil/update/:identifier",
    [authJwt.verifyToken],
    controller.updateProfile
  );

  app.post(
    "/api/angajati/profil/update-salary/:email",
    [authJwt.verifyToken],
    controller.updateSalary
  );
};
