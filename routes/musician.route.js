const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { Musician } = require("../models/Musician");

const musicianRouter = Router();

musicianRouter.get("/", async (req, res) => {
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

musicianRouter.get("/:id", async (req, res) => {
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

musicianRouter.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      try {
        await Musician.create(req.body);
        res.send("Musician created");
      } catch (err) {
        res.send(err.message);
      }
    }
  }
);

musicianRouter.put("/:id", async (req, res) => {
  try {
    let musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    res.send("Musician updated");
  } catch (err) {
    res.send(err.message);
  }
});

musicianRouter.delete("/:id", async (req, res) => {
  try {
    let musician = await Musician.findByPk(req.params.id);
    musician.destroy();
    res.send("Musician deleted");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = { musicianRouter };
