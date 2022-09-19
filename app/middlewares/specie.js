const db = require("../models");
const Errors = require("../errors/specie");
const Animal = db.animal;

const Delete = async (req, res, next) => {
  try {
    const specie_id = await Animal.findOne({
      where: {
        specie_id: req.params.specie_id,
      },
    });

    if (specie_id) {
      return res.json(Errors.Delete.specie_id);
    }

    next();
  } catch (error) {
    res.json({
      error: "Verifique se o specie_id passado por parâmetro está correto!",
      query: error.sql,
    });
  }
};

module.exports = {
  Delete,
};
