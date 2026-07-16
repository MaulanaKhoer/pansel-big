const controller = require("../controllers/pengumuman.controller.js");
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
  app.get("/api/pengumuman", controller.findAll);
  app.get("/api/pengumuman/:uuid", controller.findOne);
  app.get("/api/pengumuman/active", controller.findAllActive);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/pengumuman", [authJwt.verifyToken], controller.create);
  app.put("/api/pengumuman/:uuid", [authJwt.verifyToken], controller.update);
  app.delete("/api/pengumuman/:uuid", [authJwt.verifyToken], controller.delete);
};
