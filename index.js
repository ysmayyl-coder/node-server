const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const posts = require("./routes/Posts");
app.use("/", posts);

const comments = require("./routes/Comments");
app.use("/comments", comments);

const users = require("./routes/Users");
app.use("/auth", users);

const likes = require("./routes/Likes");
app.use("/like", likes);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
