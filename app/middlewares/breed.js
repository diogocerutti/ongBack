const db = require("../models");
const Errors = require("../errors/breed");
const Animal = db.animal;

const Delete = async (req, res, next) => {
  try {
    const breed_id = await Animal.findOne({
      where: {
        breed_id: req.params.breed_id,
      },
    });

    if (breed_id) {
      return res.json(Errors.Delete.breed_id);
    }

    next();
  } catch (error) {
    res.json({
      error: "Verifique se o breed_id passado por parâmetro está correto!",
      query: error.sql,
    });
  }
};

module.exports = {
  Delete,
};
