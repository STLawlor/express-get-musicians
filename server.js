const express = require("express");
const app = express();
const { Musician } = require("./Musician");
const { sequelize } = require("./db");

const port = 3000;

// app.use("/musicians", async (request, response) => {
//   let musicians = await Musician.findAll();
//   response.json(musicians);
// });

app.use("/musicians/:id", async (request, response) => {
  try {
    let musician = await Musician.findByPk(request.params.id);
    if (!musician) {
      throw new Error("Musician not found");
    } else {
      response.json(musician);
    } 
  } catch (err) {
    response.status(404).send(err.message)
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
