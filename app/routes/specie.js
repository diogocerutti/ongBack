module.exports = (app) => {
  const specie = require("../controllers/specie.js");
  var router = require("express").Router();
  router.post("/", specie.create);
  router.get("/", specie.findAll);
  router.get("/:specie_id", specie.findOne);
  router.put("/:specie_id", specie.update);
  router.delete("/:specie_id", specie.delete);
  app.use("/specie", router); // apelido para todas as rotas (o que vem antes)
};
