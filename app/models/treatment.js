const Animal = require("./animal");
const User = require("./user");
const TreatmentType = require("./treatment_type");

module.exports = (sequelize, Sequelize) => {
  const Treatment = sequelize.define(
    "treatment",
    {
      treatment_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: User,
          key: "user_id",
        },
      },
      animal_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: Animal,
          key: "animal_id",
        },
      },
      type_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: TreatmentType,
          key: "type_id",
        },
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      cost: {
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

  return Treatment;
};
