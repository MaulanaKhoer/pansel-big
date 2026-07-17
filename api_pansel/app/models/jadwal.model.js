module.exports = (sequelize, Sequelize) => {
  const Jadwal = sequelize.define("jadwal", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    kegiatan: {
      type: Sequelize.STRING(255)
    },
    tanggal_mulai: {
      type: Sequelize.DATEONLY
    },
    tanggal_selesai: {
      type: Sequelize.DATEONLY
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    order_no: {
      type: Sequelize.INTEGER
    }
  });

  return Jadwal;
};
