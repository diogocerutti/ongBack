exports.Delete = {
  type_id: {
    error:
      "Tipo de atendimento não pode ser excluído pois tem dependências na tabela de atendimento!",
  },
};
