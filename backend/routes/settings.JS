const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET */
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user.settings);
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const { dark, notifications, language } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      settings: { dark, notifications, language }
    },
    { new: true }
  );

  res.json(user.settings);
});

module.exports = router;