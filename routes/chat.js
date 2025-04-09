const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  res.render("chat", {
    title: "Chat",
    username: req.session.username,
  });
});

module.exports = router;