exports.Create = {
  breed_id: {
    notEmpty: {
      errorMessage: "Raça do animal obrigatória!",
    },
  },
  specie_id: {
    notEmpty: {
      errorMessage: "Espécie do animal obrigatória!",
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
