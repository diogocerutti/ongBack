const db = require("../models");
const Animal = db.animal;
const Breed = db.breed;
const Specie = db.specie;
const { validationResult } = require("express-validator");

Animal.belongsTo(Breed, {
  foreignKey: "breed_id",
});

Animal.belongsTo(Specie, {
  foreignKey: "specie_id",
});

exports.Create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }

    const animal = {
      nickname: req.body.nickname,
      description: req.body.description,
      outgoing: req.body.outgoing,
      breed_id: req.body.breed_id,
      specie_id: req.body.specie_id,
      image: req.body.image,
    };

    Animal.create(animal).then((data) => {
      res.json({ message: "Animal criado: ", data });
    });
  } catch (error) {
    res.json(error);
  }
};

exports.findAll = (req, res) => {};
exports.findOne = (req, res) => {};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};
