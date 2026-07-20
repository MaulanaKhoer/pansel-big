const controller = require("../controllers/user.controller.js");
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
  app.get("/api/user", controller.findAll);
  app.get("/api/user/:uuid", controller.findOne);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/user", [authJwt.verifyToken], controller.create);
  app.put("/api/user/:uuid", [authJwt.verifyToken], controller.update);
  app.delete("/api/user/:uuid", [authJwt.verifyToken], controller.delete);
};
