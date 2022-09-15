const db = require("../models");
const config = require("../config/auth.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = db.user;
const Op = db.Sequelize.Op;
const Errors = require("../errors/user");

exports.SignUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }
    const { username, email, password, name, date, cpf } = req.body;
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      name,
      date,
      cpf,
    };
    const user = await User.create(data);

    if (user) {
      const token = jwt.sign({ id: user.user_id }, config.secret, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true }); // 3 horas

      return res
        .status(201)
        .json({ message: "Usuário cadastrado: ", user, token: token });
    } else {
      return res.status(409).send("Ocorreu um erro, verifique as informações!");
    }
  } catch (error) {
    res.json(error);
  }
};

exports.Login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
      where: { username: req.body.username },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.user_id }, config.secret, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

        return res
          .status(201)
          .json({ message: "Logado com sucesso!", token: token });
      } else {
        return res.json(Errors.LoginExists);
      }
    } else {
      return res.json(Errors.LoginExists);
    }
  } catch (error) {
    res.json(error);
  }
};

exports.FindAll = (req, res) => {
  User.findAll({ raw: true, order: [["user_id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao tentar listar os usuários!",
      });
    });
};

exports.FindOne = (req, res) => {
  const user_id = req.params.user_id;
  User.findByPk(user_id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o usuário de id: ${user_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar encontrar o usuário de ID: " + user_id,
      });
    });
};

exports.Update = (req, res) => {
  if (!req.body.user_name) {
    res.status(400).send({
      message: "O novo nome do usuário não pode ser vazio!",
    });
    return;
  }
  const { user_id } = req.params;
  const { user_name, password } = req.body;
  User.update(
    {
      user_name,
      password,
    },
    {
      where: { user_id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuário atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Usuário de ID: ${user_id} não encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Ocorreu algum erro ao tentar atualizar o usuário de ID: " + user_id,
      });
    });
};

exports.Delete = (req, res) => {
  const user_id = req.params.user_id;
  User.destroy({
    where: { user_id: user_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuário excluído com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível excluir o usuário de ID: ${user_id}. Talvez o usuário não exista!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível deletar o usuário de ID: " + user_id,
      });
    });
};
