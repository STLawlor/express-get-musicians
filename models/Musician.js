const { Sequelize, sequelize } = require("../db");

let Musician = sequelize.define("musician", {
  name: Sequelize.STRING,
  instrument: Sequelize.STRING,
});

module.exports = { Musician };
