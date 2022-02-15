const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/createComment", validateToken, async (req, res) => {
  const comment = req.body;
  comment.username = req.user.username;
  await Comments.create(comment)
    .then(() => {
      res.json(comment);
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
});

module.exports = router;
