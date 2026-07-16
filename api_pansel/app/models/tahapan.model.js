module.exports = (sequelize, Sequelize) => {
  const Tahapan = sequelize.define("tahapan", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    step_no: {
      type: Sequelize.INTEGER
    },
    judul: {
      type: Sequelize.STRING(150)
    },
    deskripsi: {
      type: Sequelize.TEXT
    },
    icon_name: {
      type: Sequelize.STRING(50)
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Tahapan;
};
