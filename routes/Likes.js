const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: req.user.id },
  });

  if (found) {
    await Likes.destroy({ where: { PostId: PostId, UserId: req.user.id } });
    res.json({ liked: false });
  } else {
    await Likes.create({
      PostId: PostId,
      UserId: req.user.id,
    });
    res.json({ liked: true });
  }
});

module.exports = router;
