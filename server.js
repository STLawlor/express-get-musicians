const express = require("express");
const app = express();
const { Musician } = require("./Musician");
const { sequelize } = require("./db");

const port = 3000;

app.use("/musicians", async (request, response) => {
  let musicians = await Musician.findAll();
  response.json(musicians);
});

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
