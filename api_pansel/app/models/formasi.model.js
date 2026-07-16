module.exports = (sequelize, Sequelize) => {
  const Formasi = sequelize.define("formasi", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    order_no: {
      type: Sequelize.INTEGER
    },
    jabatan: {
      type: Sequelize.STRING(255)
    },
    tugas_fungsi: {
      type: Sequelize.TEXT
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Formasi;
};
