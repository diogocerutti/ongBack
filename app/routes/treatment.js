const Treatment = require("../controllers/treatment.js");
const Middlewares = require("../middlewares/treatment");
const Errors = require("../errors/treatment");
const router = require("express").Router();
const { checkSchema } = require("express-validator");

module.exports = (app) => {
  router.post(
    "/",
    checkSchema(Errors.Create),
    Middlewares.Create,
    Treatment.Create
  );
  router.get("/", Treatment.FindAll);
  router.get("/:treatment_id", Treatment.FindOne);
  router.put("/:treatment_id", checkSchema(Errors.Create), Treatment.Update);
  router.delete("/:treatment_id", Treatment.Delete);
  app.use("/treatment", router); // apelido para todas as rotas (o que vem antes)
};
