const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:postId", async (req, res) => {
  const id = req.params.postId;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/createPost", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
