module.exports = (sequelize, Sequelize) => {
  const TreatmentType = sequelize.define(
    "treatment_type",
    {
      type_id: {
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
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return TreatmentType;
};
