const specie = require("../controllers/specie.js");

test("findAll", async () => {
  const result = await specie.findAll();
  expect(result).toEqual(result);
  console.log(result);
});
