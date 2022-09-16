const db = require("../models");
const Errors = require("../errors/user");
const User = db.user;

// Verificar se o username, email ou CPF fornecidos já existem no banco
// Pois só pode existir um usuário com as mesmas informações
const SignUp = async (req, res, next) => {
  // aqui procura no banco pra ver se o username já existe
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // se o username já existe, retorna um erro
    if (username) {
      return res.json(Errors.SignUpExists.username);
      // erro no arquivo das validações
    }

    // verifica se o email fornecido já existe
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // se o email já existe, retorna erro
    if (emailcheck) {
      return res.json(Errors.SignUpExists.email);
    }

    // verifica se o CPF fornecido já existe
    const cpfcheck = await User.findOne({
      where: {
        cpf: req.body.cpf,
      },
    });

    // se o CPF já existe, retorna erro
    if (cpfcheck) {
      return res.json(Errors.SignUpExists.cpf);
    }

    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  SignUp,
};
