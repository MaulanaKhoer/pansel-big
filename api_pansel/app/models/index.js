const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.web_config = require("./web_config.model.js")(sequelize, Sequelize);
db.formasi = require("./formasi.model.js")(sequelize, Sequelize);
db.pengumuman = require("./pengumuman.model.js")(sequelize, Sequelize);
db.jadwal = require("./jadwal.model.js")(sequelize, Sequelize);
db.tahapan = require("./tahapan.model.js")(sequelize, Sequelize);
db.unduh_berkas = require("./unduh_berkas.model.js")(sequelize, Sequelize);
db.daftar_step = require("./daftar_step.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
