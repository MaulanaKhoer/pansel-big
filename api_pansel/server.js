const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[HTTP LOG] ${req.method} ${req.url} - Content-Type: ${req.headers['content-type']}`);
  console.log(`[HTTP BODY]`, req.body);
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();
//In development, you may need to drop existing tables and re-sync database.

//Alter Tabel
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//Force Tabel
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/formasi.routes')(app);
require('./app/routes/daftar_step.routes')(app);
require('./app/routes/jadwal.routes')(app);
require('./app/routes/pengumuman.routes')(app);
require('./app/routes/tahapan.routes')(app);
require('./app/routes/unduh_berkas.routes')(app);
require('./app/routes/web_config.routes')(app);
require('./app/routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to api_pansel application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
