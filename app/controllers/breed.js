const db = require("../models");
const Breed = db.breed;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Nome não pode ser vazio!",
    });
    return;
  }
  const breed = {
    name: req.body.name,
    description: req.body.description,
  };
  Breed.create(breed)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao tentar inserir a raça!",
      });
    });
};

exports.findAll = (req, res) => {
  Breed.findAll({ raw: true, order: [["breed_id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao tentar listar as raças!",
      });
    });
};

exports.findOne = (req, res) => {
  const breed_id = req.params.breed_id;
  Breed.findByPk(breed_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar a raça de ID: ${breed_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar encontrar a raça de ID: " + breed_id,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "O novo nome da raça não pode ser vazio!",
    });
    return;
  }
  const { breed_id } = req.params;
  const { name, description } = req.body;
  Breed.update(
    {
      name,
      description,
    },
    {
      where: { breed_id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Raça atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Raça de ID: ${breed_id} não encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar atualizar a raça de ID=" + breed_id,
      });
    });
};

exports.delete = (req, res) => {
  const breed_id = req.params.breed_id;
  Breed.destroy({
    where: { breed_id: breed_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Raça excluída com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível excluir a raça de ID: ${breed_id}. Talvez a raça não exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível deletar a raça de ID: " + breed_id,
      });
    });
};
