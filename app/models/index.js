const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.animal = require("./animal.js")(sequelize, Sequelize);
db.breed = require("./breed.js")(sequelize, Sequelize);
db.specie = require("./specie.js")(sequelize, Sequelize);
db.treatment = require("./treatment.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.treatment_type = require("./treatment_type.js")(sequelize, Sequelize);
module.exports = db;
