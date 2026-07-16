const controller = require("../controllers/tahapan.controller.js");
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
  app.get("/api/tahapan", controller.findAll);
  app.get("/api/tahapan/active", controller.findAllActive);
  app.get("/api/tahapan/:uuid", controller.findOne);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/tahapan", [authJwt.verifyToken], controller.create);
  app.put("/api/tahapan/:uuid", [authJwt.verifyToken], controller.update);
  app.delete("/api/tahapan/:uuid", [authJwt.verifyToken], controller.delete);
};
