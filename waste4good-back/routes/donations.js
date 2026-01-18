const express = require("express");
const router = express.Router();
const pool = require("../db");

// Route pour récupérer toutes les donations
router.get("/", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM donations");
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
