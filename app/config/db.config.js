module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postdi8",
  DB: "ong",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
