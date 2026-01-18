const express = require("express");
const router = express.Router();
const pool = require("../db");

// Route pour récupérer tous les is_collected
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM is_collected");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
