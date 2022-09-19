const breed = require("../controllers/breed.js");
const Middlewares = require("../middlewares/breed");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/", breed.Create);
  router.get("/", breed.FindAll);
  router.get("/:breed_id", breed.FindOne);
  router.put("/:breed_id", breed.Update);
  router.delete("/:breed_id", Middlewares.Delete, breed.Delete);
  app.use("/breed", router); // apelido para todas as rotas (o que vem antes)
};
