const Specie = require("./specie");
const Breed = require("./breed");

module.exports = (sequelize, Sequelize) => {
  const Animal = sequelize.define(
    "animal",
    {
      animal_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nickname: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      specie_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: Specie,
          key: "specie_id",
        },
      },
      breed_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: Breed,
          key: "breed_id",
        },
      },
      image: {
        type: Sequelize.BLOB,
      },
      description: {
        type: Sequelize.STRING,
      },
      outgoing: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Animal;
};
