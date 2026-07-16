const controller = require("../controllers/jadwal.controller.js");
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
  app.get("/api/jadwal", controller.findAll);
  app.get("/api/jadwal/:uuid", controller.findOne);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/jadwal", [authJwt.verifyToken], controller.create);
  app.put("/api/jadwal/:uuid", [authJwt.verifyToken], controller.update);
  app.delete("/api/jadwal/:uuid", [authJwt.verifyToken], controller.delete);
};
