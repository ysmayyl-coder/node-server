const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.json("cant' find user");
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) return res.json("password is not correct");

    const accessToken = sign(
      {
        username: user.username,
        id: user.id,
      },
      "importantsecret"
    );

    return res.json(accessToken);
  });
});

router.get("/get", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
