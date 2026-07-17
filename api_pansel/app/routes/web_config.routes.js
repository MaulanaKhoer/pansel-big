const controller = require("../controllers/web_config.controller.js");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  // Public routes (GET without token)
  app.get("/api/web_config", controller.findAll);
  app.get("/api/web_config/:uuid", controller.findOne);
  app.get("/api/seleksi/active", controller.getActive);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/web_config", [authJwt.verifyToken], controller.create);
  app.put("/api/web_config/:uuid", [authJwt.verifyToken], controller.update);
  app.delete("/api/web_config/:uuid", [authJwt.verifyToken], controller.delete);
  app.post("/api/seleksi/update", [authJwt.verifyToken], controller.updateActive);
};
