const Animal = require("../controllers/animal.js");
const Middlewares = require("../middlewares/animal");
const Errors = require("../errors/animal");
const router = require("express").Router();
const { checkSchema } = require("express-validator");

module.exports = (app) => {
  router.post(
    "/",
    checkSchema(Errors.Create),
    Middlewares.Create,
    Animal.Create
  );
  app.use("/animal", router); // apelido para todas as rotas (o que vem antes)
};
