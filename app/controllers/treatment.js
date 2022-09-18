const db = require("../models");
const Treatment = db.treatment;
const Animal = db.animal;
const User = db.user;
const TreatmentType = db.treatment_type;
const { validationResult } = require("express-validator");

Treatment.hasMany(User, {
  foreignKey: "user_id",
});

Treatment.hasMany(Animal, {
  foreignKey: "animal_id",
});

Treatment.hasMany(TreatmentType, {
  foreignKey: "type_id",
});

exports.Create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }

    const treatment = {
      description: req.body.description,
      cost: req.body.cost,
      user_id: req.body.user_id,
      animal_id: req.body.animal_id,
      type_id: req.body.type_id,
      date: req.body.date,
      time: req.body.time,
    };

    Treatment.create(treatment).then((data) => {
      res.json({ message: "Atendimento cadastrado: ", data });
    });
  } catch (error) {
    res.json(error);
  }
};

exports.findAll = (req, res) => {};
exports.findOne = (req, res) => {};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};
