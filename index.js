const express = require("express");
const app = express();
const cors = require('cors')
const db = require("./models");

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

const posts = require("./routes/Posts");
app.use("/", posts);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
