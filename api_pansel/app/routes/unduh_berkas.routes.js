const controller = require("../controllers/unduh_berkas.controller.js");
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
  app.get("/api/unduh_berkas", controller.findAll);
  app.get("/api/unduh_berkas/:uuid", controller.findOne);
  app.get("/api/unduh_berkas/active", controller.findAllActive);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/unduh_berkas", [authJwt.verifyToken], controller.create);
  app.put("/api/unduh_berkas/:uuid", [authJwt.verifyToken], controller.update);
  app.delete("/api/unduh_berkas/:uuid", [authJwt.verifyToken], controller.delete);
};
