module.exports = (app) => {
  const breed = require("../controllers/breed.js");
  var router = require("express").Router();
  router.post("/", breed.create);
  router.get("/", breed.findAll);
  router.get("/:breed_id", breed.findOne);
  router.put("/:breed_id", breed.update);
  router.delete("/:breed_id", breed.delete);
  app.use("/breed", router); // apelido para todas as rotas (o que vem antes)
};
