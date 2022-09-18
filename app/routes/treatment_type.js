module.exports = (app) => {
  const treatment_type = require("../controllers/treatment_type.js");
  var router = require("express").Router();
  router.post("/", treatment_type.Create);
  router.get("/", treatment_type.FindAll);
  router.get("/:type_id", treatment_type.FindOne);
  router.put("/:type_id", treatment_type.Update);
  router.delete("/:type_id", treatment_type.Delete);
  app.use("/treatment_type", router); // apelido para todas as rotas (o que vem antes)
};
