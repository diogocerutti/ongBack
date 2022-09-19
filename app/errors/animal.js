exports.Create = {
  nickname: {
    notEmpty: {
      errorMessage: "Apelido do animal obrigatório!",
    },
  },
  breed_id: {
    isInt: {
      errorMessage: "ID da raça não pode ser vazio e deve ser um número!",
    },
  },
  specie_id: {
    isInt: {
      errorMessage: "ID da espécie não pode ser vazio e deve ser um número!",
    },
  },
};

exports.CreateExists = {
  breed_id: {
    error: "Não existe raça com esse ID!",
  },
  specie_id: {
    error: "Não existe espécie com esse ID!",
  },
};

exports.Delete = {
  animal_id: {
    error:
      "Animal não pode ser excluído pois tem dependências na tabela de atendimento!",
  },
};
