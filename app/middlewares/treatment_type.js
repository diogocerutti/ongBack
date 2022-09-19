const db = require("../models");
const Errors = require("../errors/treatment_type");
const Treatment = db.treatment;

const Delete = async (req, res, next) => {
  try {
    const type_id = await Treatment.findOne({
      where: {
        type_id: req.params.type_id,
      },
    });

    if (type_id) {
      return res.json(Errors.Delete.type_id);
    }

    next();
  } catch (error) {
    res.json({
      error: "Verifique se o type_id passado por parâmetro está correto!",
      query: error.sql,
    });
  }
};

module.exports = {
  Delete,
};
