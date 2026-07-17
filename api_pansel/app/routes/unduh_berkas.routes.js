const controller = require("../controllers/unduh_berkas.controller.js");
const { authJwt } = require("../middleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads/unduh_berkas folder exists
const uploadDir = path.join(__dirname, "../../uploads/unduh_berkas");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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
  app.get("/api/unduh_berkas/active", controller.findAllActive);
  app.get("/api/unduh_berkas/download/:uuid", controller.download);
  app.get("/api/unduh_berkas/view/:uuid", controller.view);
  app.get("/api/unduh_berkas/:uuid", controller.findOne);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/unduh_berkas", [authJwt.verifyToken, upload.any()], controller.create);
  app.put("/api/unduh_berkas/:uuid", [authJwt.verifyToken, upload.any()], controller.update);
  app.delete("/api/unduh_berkas/:uuid", [authJwt.verifyToken], controller.delete);
};
