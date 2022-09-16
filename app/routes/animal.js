const Animal = require("../controllers/animal.js");
var router = require("express").Router();
//const Middlewares = require("../middlewares/animal");
const Errors = require("../errors/animal");
const { checkSchema } = require("express-validator");

module.exports = (app) => {
  router.post(
    "/",
    checkSchema(Errors.Create),
    Animal.Create
    //Middlewares.Create
  );
  app.use("/animal", router); // apelido para todas as rotas (o que vem antes)
};
