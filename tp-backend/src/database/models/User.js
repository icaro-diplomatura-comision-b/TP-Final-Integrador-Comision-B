module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      id: {
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },

      username: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },

      firstName: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },

      lastName: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },

      password: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },

      country: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },

      city: {
        type: dataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};
