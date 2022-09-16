const db = require("../models");
const Animal = db.animal;
const Breed = db.breed;
const Specie = db.specie;
const Op = db.Sequelize.Op;

Animal.belongsTo(Breed, {
  foreignKey: "breed_id",
});

Animal.belongsTo(Specie, {
  foreignKey: "specie_id",
});

exports.Create = async (req, res) => {
  if (!req.body.nickname) {
    res.status(400).send({
      message: "Apelido do animal não pode ser vazio!",
    });
    return;
  }
  if (!req.body.breed_id) {
    res.status(400).send({
      message: "Insira o ID da raça!",
    });
    return;
  }
  if (!req.body.specie_id) {
    res.status(400).send({
      message: "Insira o ID da espécie!",
    });
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

  Animal.create(animal)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar inserir o animal!",
      });
    });
};

exports.findAll = (req, res) => {};
exports.findOne = (req, res) => {};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};
