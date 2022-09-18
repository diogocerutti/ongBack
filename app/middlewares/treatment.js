const db = require("../models");
const Errors = require("../errors/treatment");
const User = db.user;
const Animal = db.animal;
const TreatmentType = db.treatment_type;

const Create = async (req, res, next) => {
  try {
    const user_idCheck = await User.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });

    if (!user_idCheck) {
      return res.json(Errors.CreateExists.user_id);
    }

    const animal_idCheck = await Animal.findOne({
      where: {
        animal_id: req.body.animal_id,
      },
    });

    if (!animal_idCheck) {
      return res.json(Errors.CreateExists.animal_id);
    }

    const treatmentType_idCheck = await TreatmentType.findOne({
      where: {
        type_id: req.body.type_id,
      },
    });

    if (!treatmentType_idCheck) {
      return res.json(Errors.CreateExists.type_id);
    }

    next();
  } catch (error) {
    res.json({
      error: "Verifique possíveis campos em branco!",
      query: error.sql,
    });
  }
};

module.exports = {
  Create,
};
