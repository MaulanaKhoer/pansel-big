module.exports = (sequelize, Sequelize) => {
  const DaftarStep = sequelize.define("daftar_step", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    step_no: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return DaftarStep;
};
