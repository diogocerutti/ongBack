exports.SignUp = {
  username: {
    isLength: {
      errorMessage: "O nome de usuário deve conter no mínimo 4 caracteres!",
      options: { min: 4 },
    },
  },
  password: {
    isLength: {
      errorMessage: "A senha deve conter pelo menos 5 caracteres!",
      options: { min: 5 },
    },
  },
  name: {
    notEmpty: {
      errorMessage: "O nome deve conter no mínimo 1 caractere!",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Formato de e-mail inválido!",
    },
  },
  cpf: {
    isLength: {
      errorMessage: "Tamanho de CPF inválido!",
      options: { min: 11 },
    },
  },
  date: {
    isDate: {
      errorMessage: "Formato de data inválido!",
    },
  },
};

exports.SignUpExists = {
  username: {
    error: "Login de usuário já existe!",
  },
  email: {
    error: "E-mail já está em uso!",
  },
  cpf: {
    error: "CPF já está em uso!",
  },
};

exports.Login = {
  username: {
    notEmpty: {
      errorMessage: "Nome de usuário obrigatório!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Senha obrigatória!",
    },
  },
};

exports.LoginExists = {
  usernameOrPassword: {
    error: "Nome de usuário ou senha inválidos!",
  },
};
