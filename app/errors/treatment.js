/*const RegExp = require("regexp");
const hour = new RegExp("^(10|11|12|[1-9]):[0-5][0-9]$");*/

exports.Create = {
  description: {
    isLength: {
      errorMessage: "A descrição deve conter no mínimo 5 caracteres!",
      options: { min: 5 },
    },
  },
  date: {
    isDate: true,
    errorMessage: "Data inválida!",
  },
  time: {
    notEmpty: true,
    //matches: hour,
    errorMessage: "Hora inválida!",
  },
  user_id: {
    isInt: {
      errorMessage: "ID do usuário não pode ser vazio e deve ser um inteiro!",
    },
  },
  animal_id: {
    isInt: {
      errorMessage: "ID do animal não pode ser vazio e deve ser um inteiro!",
    },
  },
  type_id: {
    isInt: {
      errorMessage:
        "ID do tipo de atendimento não pode ser vazio e deve ser um inteiro!",
    },
  },
  cost: {
    isFloat: {
      errorMessage: "O custo do atendimento deve ser um número real!",
    },
  },
};

exports.CreateExists = {
  user_id: {
    error: "ID de usuário não encontrado!",
  },
  animal_id: {
    error: "ID do animal não encontrado!",
  },
  type_id: {
    error: "ID do tipo de atendimento não encontrado!",
  },
};
