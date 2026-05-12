const express = require("express");
const router = express.Router();
const Commande = require("../models/Commande");

/* CREATE COMMANDE */
router.post("/", async (req, res) => {
  try {
    const cmd = new Commande(req.body);
    await cmd.save();

    res.json({ success: true, message: "Commande enregistrée ✅" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* GET ALL COMMANDES (admin) */
router.get("/", async (req, res) => {
  const data = await Commande.find().sort({ createdAt: -1 });
  res.json(data);
});
/* UPDATE STATUS */
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const cmd = await Commande.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(cmd);
  } catch (err) {
    res.status(500).json({ error: "Erreur ❌" });
  }
});
module.exports = router;