const treatment_type = require("../controllers/treatment_type.js");
const Middlewares = require("../middlewares/treatment_type");
const router = require("express").Router();

module.exports = (app) => {
  router.post("/", treatment_type.Create);
  router.get("/", treatment_type.FindAll);
  router.get("/:type_id", treatment_type.FindOne);
  router.put("/:type_id", treatment_type.Update);
  router.delete("/:type_id", Middlewares.Delete, treatment_type.Delete);
  app.use("/treatment_type", router);
};
