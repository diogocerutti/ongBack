const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Servidor Rodando!" });
});
db.sequelize
  .authenticate()
  //.sync({ force: true }) isso cria todas as tabelas no banco
  // mesmo se elas já existam, no plural (com S)
  .then(() => {
    console.log("Banco autenticado");
  })
  .catch((err) => {
    console.log("Falha ao sincronizar com o banco: " + err.message);
  });
// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./app/routes/user.js")(app);
require("./app/routes/breed.js")(app);
require("./app/routes/specie.js")(app);
require("./app/routes/animal.js")(app);
require("./app/routes/treatment_type.js")(app);
require("./app/routes/treatment.js")(app);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
