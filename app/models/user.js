module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true,
        isEmail: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true,
      },
      date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return User;
};
