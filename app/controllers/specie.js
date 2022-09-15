const db = require("../models");
const Specie = db.specie;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Nome não pode ser vazio!",
    });
    return;
  }
  const specie = {
    name: req.body.name,
    description: req.body.description,
  };
  Specie.create(specie)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar inserir a espécie!",
      });
    });
};

exports.findAll = (req, res) => {
  Specie.findAll({ raw: true, order: [["specie_id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar listar as espécies!",
      });
    });
};

exports.findOne = (req, res) => {
  const specie_id = req.params.specie_id;
  Specie.findByPk(specie_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar a espécie de ID: ${specie_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar encontrar a especie de ID: " +
          specie_id,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "O novo nome da espécie não pode ser vazio!",
    });
    return;
  }
  const { specie_id } = req.params;
  const { name, description } = req.body;
  Specie.update(
    {
      name,
      description,
    },
    {
      where: { specie_id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Espécie atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Espécie de ID: ${specie_id} não encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar atualizar a espécie de ID: " +
          specie_id,
      });
    });
};

exports.delete = (req, res) => {
  const specie_id = req.params.specie_id;
  Specie.destroy({
    where: { specie_id: specie_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Espécie excluída com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível excluir a espécie de ID: ${specie_id}. Talvez a espécie não exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível deletar a espécie de ID: " + specie_id,
      });
    });
};
