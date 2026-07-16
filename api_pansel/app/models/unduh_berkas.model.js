module.exports = (sequelize, Sequelize) => {
  const UnduhBerkas = sequelize.define("unduh_berkas", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    order_no: {
      type: Sequelize.INTEGER
    },
    nama_berkas: {
      type: Sequelize.STRING(255)
    },
    nama_file: {
      type: Sequelize.STRING(255)
    },
    tanggal_publikasi: {
      type: Sequelize.DATEONLY
    },
    url_link: {
      type: Sequelize.STRING(500)
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return UnduhBerkas;
};
