const db = require("../models");
const Errors = require("../errors/animal");
const Breed = db.breed;
const Specie = db.specie;
const Treatment = db.treatment;

const Create = async (req, res, next) => {
  try {
    const breed_idCheck = await Breed.findOne({
      where: {
        breed_id: req.body.breed_id,
      },
    });

    if (!breed_idCheck) {
      return res.json(Errors.CreateExists.breed_id);
    }

    const specie_idCheck = await Specie.findOne({
      where: {
        specie_id: req.body.specie_id,
      },
    });

    if (!specie_idCheck) {
      return res.json(Errors.CreateExists.specie_id);
    }

    next();
  } catch (error) {
    res.json({
      error: "Verifique possíveis campos em branco!",
      query: error.sql,
    });
  }
};

const Delete = async (req, res, next) => {
  try {
    const animal_id = await Treatment.findOne({
      where: {
        animal_id: req.params.animal_id,
      },
    });

    if (animal_id) {
      return res.json(Errors.Delete.animal_id);
    }

    next();
  } catch (error) {
    res.json({
      error: "Verifique se o animal_id passado por parâmetro está correto!",
      query: error.sql,
    });
  }
};

module.exports = {
  Create,
  Delete,
};
