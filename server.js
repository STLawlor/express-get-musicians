const express = require("express");
const { sequelize } = require("./db");
const { musicianRouter } = require("./routes/musician.route")

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use("/musicians", musicianRouter);

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
