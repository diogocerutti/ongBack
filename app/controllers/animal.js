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

exports.FindAll = (req, res) => {
  Animal.findAll({ raw: true, order: [["animal_id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar listar os animais!",
      });
    });
};

exports.FindOne = (req, res) => {
  const animal_id = req.params.animal_id;
  Animal.findByPk(animal_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o animal de id: ${animal_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
        message:
          "Ocorreu algum erro ao tentar encontrar o animal de ID: " + animal_id,
      });
    });
};

exports.Update = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }

    const { animal_id } = req.params;

    const animal = {
      nickname: req.body.nickname,
      description: req.body.description,
      outgoing: req.body.outgoing,
      breed_id: req.body.breed_id,
      specie_id: req.body.specie_id,
      image: req.body.image,
    };

    Animal.update(animal).then((data) => {
      if (data == 1) {
        res.send({
          message: "Animal atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Animal de ID: ${animal_id} não encontrado!`,
        });
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.Delete = (req, res) => {
  const animal_id = req.params.animal_id;
  Animal.destroy({
    where: { animal_id: animal_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Animal excluído com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível excluir o animal de ID: ${animal_id}. Talvez o animal não exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível deletar o animal de ID: " + animal_id,
      });
    });
};
