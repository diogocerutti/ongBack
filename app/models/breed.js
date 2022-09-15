module.exports = (sequelize, Sequelize) => {
  const Breed = sequelize.define(
    "breed",
    {
      breed_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Breed;
};
