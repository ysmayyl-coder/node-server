const express = require("express");
const app = express();
const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
});
