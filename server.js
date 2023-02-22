const express = require("express");
const app = express();
const { Musician } = require("./Musician");
const { sequelize } = require("./db");

const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.get("/musicians", async (req, res) => {
  try {
    let musicians = await Musician.findAll();
    if (musicians) {
      res.json(musicians);
    } else {
      throw new Error("Musicians not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/musicians/:id", async (req, res) => {
  try {
    let musician = await Musician.findByPk(req.params.id);
    if (!musician) {
      throw new Error("Musician not found");
    } else {
      res.json(musician);
    }
  } catch (err) {
    res.send(err);
  }
});

app.post("/musicians", async (req, res) => {
  try {
    await Musician.create(req.body);
    res.send("Musician created");
  } catch (err) {
    res.send(err.message);
  }
});

app.put("/musicians/:id", async (req, res) => {
  try {
    let musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.send("Musician updated");
  } catch (err) {
    res.send(err.message);
  }
});

app.delete("/musicians/:id", async (req, res) => {
  try {
    let musician = await Musician.findByPk(req.params.id);
    musician.destroy();
    res.send("Musician deleted");
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
