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
          model: "user",
          key: "user_id",
        },
      },
      animal_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "animal",
          key: "animal_id",
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        required: true,
      },
      time: {
        type: Sequelize.TIME,
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
