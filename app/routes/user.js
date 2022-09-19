const User = require("../controllers/user.js");
const Middlewares = require("../middlewares/user");
const Errors = require("../errors/user");
const router = require("express").Router();
const { checkSchema } = require("express-validator");

module.exports = (app) => {
  router.post(
    "/signup",
    checkSchema(Errors.SignUp), // verifica se os dados são válidos
    Middlewares.SignUp, // verifica se os dados já existem no banco
    User.SignUp
  );
  router.post("/login", checkSchema(Errors.Login), User.Login);
  router.get("/", User.FindAll);
  router.get("/:user_id", User.FindOne);
  router.put("/:user_id", User.Update);
  router.delete("/:user_id", Middlewares.Delete, User.Delete);
  app.use("/user", router); // apelido para todas as rotas (o que vem antes)
};
