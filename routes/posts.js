const express = require("express"),
  router = express.Router(),
  { ensureAuthenticated } = require("../helpers/auth"),
  Post = require("../models").Post;

router.post("/", ensureAuthenticated, (req, res) => {
    Post.create({ title: req.body.message, UserId: req.user.id }).then(result => {
        res.status(200).json({
            post: result
        });
    });
});

module.exports = router;