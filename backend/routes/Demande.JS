const express = require("express");
const router = express.Router();
const Demande = require("../models/Demande");

/* ADD DEMANDE */
router.post("/", async (req, res) => {
  const demande = new Demande(req.body);
  await demande.save();
  res.json(demande);
});

/* GET ALL */
router.get("/", async (req, res) => {
  const data = await Demande.find().sort({ createdAt: -1 });
  res.json(data);
});

/* UPDATE STATUS */
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  const updated = await Demande.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;