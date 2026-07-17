const controller = require("../controllers/pengumuman.controller.js");
const { authJwt } = require("../middleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../../uploads/pengumuman");
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
  app.get("/api/pengumuman", controller.findAll);
  app.get("/api/pengumuman/active", controller.findAllActive);
  app.get("/api/pengumuman/download/:uuid", controller.download);
  app.get("/api/pengumuman/view/:uuid", controller.view);
  app.get("/api/pengumuman/:uuid", controller.findOne);

  // Protected routes (POST/PUT/DELETE with token)
  app.post("/api/pengumuman", [authJwt.verifyToken, upload.any()], controller.create);
  app.put("/api/pengumuman/:uuid", [authJwt.verifyToken, upload.any()], controller.update);
  app.delete("/api/pengumuman/:uuid", [authJwt.verifyToken], controller.delete);
};
