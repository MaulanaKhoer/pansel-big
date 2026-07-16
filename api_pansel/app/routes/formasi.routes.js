const formasi = require("../controllers/formasi.controller.js");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Public route
  app.get("/api/formasi/active", formasi.findAllActive);

  // Protected routes (Admin only)
  app.post("/api/formasi", [authJwt.verifyToken], formasi.create);
  app.get("/api/formasi", [authJwt.verifyToken], formasi.findAll);
  app.get("/api/formasi/:uuid", [authJwt.verifyToken], formasi.findOne);
  app.put("/api/formasi/:uuid", [authJwt.verifyToken], formasi.update);
  app.delete("/api/formasi/:uuid", [authJwt.verifyToken], formasi.delete);
};
