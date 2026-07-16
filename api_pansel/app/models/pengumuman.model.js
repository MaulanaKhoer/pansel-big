module.exports = (sequelize, Sequelize) => {
  const Pengumuman = sequelize.define("pengumuman", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    judul: {
      type: Sequelize.STRING(255)
    },
    tanggal: {
      type: Sequelize.DATEONLY
    },
    konten: {
      type: Sequelize.TEXT
    },
    file_url: {
      type: Sequelize.STRING(255)
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Pengumuman;
};
