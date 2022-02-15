module.exports = (sequelize, dataTypes) => {
  const Message = sequelize.define(
    "Messages",
    {
      id: {
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },

      receiverId: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },

      senderId: {
        type: dataTypes.INTEGER,
        allowNull: true,
      },

      text: {
        type: dataTypes.STRING(144),
        allowNull: false,
      },
    },
    {
      tableName: "messages",
      timestamps: false,
    }
  );

  return Message;
};
