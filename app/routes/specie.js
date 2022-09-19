const specie = require("../controllers/specie.js");
const Middlewares = require("../middlewares/specie");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/", specie.Create);
  router.get("/", specie.FindAll);
  router.get("/:specie_id", specie.FindOne);
  router.put("/:specie_id", specie.Update);
  router.delete("/:specie_id", Middlewares.Delete, specie.Delete);
  app.use("/specie", router); // apelido para todas as rotas (o que vem antes)
};
