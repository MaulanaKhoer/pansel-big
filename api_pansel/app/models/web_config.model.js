module.exports = (sequelize, Sequelize) => {
  const WebConfig = sequelize.define("web_config", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    title: {
      type: Sequelize.STRING
    },
    caption: {
      type: Sequelize.TEXT
    },
    pratama: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    madya: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    utama: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });

  return WebConfig;
};
