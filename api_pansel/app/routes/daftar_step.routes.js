const controller = require("../controllers/daftar_step.controller.js");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Public routes (GET without token)
  app.get("/api/daftar_step", controller.findAll);
  app.get("/api/daftar_step/active", controller.findAllActive);
  app.get("/api/daftar_step/:uuid", controller.findOne);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/daftar_step", [authJwt.verifyToken], controller.create);
  app.put("/api/daftar_step/:uuid", [authJwt.verifyToken], controller.update);
  app.delete("/api/daftar_step/:uuid", [authJwt.verifyToken], controller.delete);
};
