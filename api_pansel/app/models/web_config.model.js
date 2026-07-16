module.exports = (sequelize, Sequelize) => {
  const WebConfig = sequelize.define("web_config", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    key_name: {
      type: Sequelize.STRING(50)
    },
    value: {
      type: Sequelize.TEXT
    }
  });

  return WebConfig;
};
