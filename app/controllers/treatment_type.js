const db = require("../models");
const TreatmentType = db.treatment_type;

exports.Create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Nome do tipo não pode ser vazio!",
    });
    return;
  }
  const treatment_type = {
    name: req.body.name,
  };
  TreatmentType.create(treatment_type)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocorreu algum erro ao tentar inserir o tipo de atendimento!",
      });
    });
};

exports.FindAll = (req, res) => {
  TreatmentType.findAll({ raw: true, order: [["type_id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Ocorreu algum erro ao tentar listar os tipos de atendimento!",
      });
    });
};

exports.FindOne = (req, res) => {
  const type_id = req.params.type_id;
  TreatmentType.findByPk(type_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o tipo de atendimento de ID: ${type_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar encontrar o tipo de atendimento: " +
          type_id,
      });
    });
};

exports.Update = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "O novo nome do tipo de atendimento não pode ser vazio!",
    });
    return;
  }
  const { type_id } = req.params;
  const { name } = req.body;
  TreatmentType.update(
    {
      name,
    },
    {
      where: { type_id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tipo de atendimento atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Tipo de atendimento de ID: ${type_id} não encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar atualizar o tipo de atendimento de ID=" +
          type_id,
      });
    });
};

exports.Delete = (req, res) => {
  const type_id = req.params.type_id;
  TreatmentType.destroy({
    where: { type_id: type_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tipo de atendimento excluído com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível excluir o tipo de atendimento de ID: ${type_id}. Talvez ele não exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível deletar o tipo de atendimento " + type_id,
      });
    });
};
