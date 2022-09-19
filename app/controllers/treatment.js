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

exports.FindAll = (req, res) => {
  Treatment.findAll({ raw: true, order: [["treatment_id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar listar os atendimentos!",
      });
    });
};

exports.FindOne = (req, res) => {
  const treatment_id = req.params.treatment_id;
  Treatment.findByPk(treatment_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o atendimento de id: ${treatment_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
        message: "ERRO DE PARÂMETRO?",
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

    const { treatment_id } = req.params;

    const treatment = {
      description: req.body.description,
      cost: req.body.cost,
      user_id: req.body.user_id,
      animal_id: req.body.animal_id,
      type_id: req.body.type_id,
      date: req.body.date,
      time: req.body.time,
    };

    Treatment.update(treatment).then((data) => {
      if (data == 1) {
        res.send({
          message: "Atendimento atualizado com sucesso!",
        });
      } else {
        res.send({
          message: `Atendimento de ID: ${treatment_id} não encontrado!`,
        });
      }
    });
  } catch (error) {
    res.json({
      error: "Verifique se o treatment_id passado por parâmetro está correto!",
      query: error.sql,
    });
  }
};

exports.Delete = (req, res) => {
  const treatment_id = req.params.treatment_id;
  Treatment.destroy({
    where: { treatment_id: treatment_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Atendimento excluído com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível excluir o atendimento de ID: ${treatment_id}. Talvez o atendimento não exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
        message: "Verifique os parâmetros da requisição...!",
      });
    });
};
