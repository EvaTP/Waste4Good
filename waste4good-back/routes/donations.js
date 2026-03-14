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

// GET : points disponibles d'un bénévole
// Points gagnés (collectes × barème) - Points dépensés (donations)
router.get("/points/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Total des points gagnés via les collectes
    const earnedResult = await pool.query(
      `SELECT COALESCE(SUM(ic.quantity * w.points), 0) AS total_earned
       FROM is_collected ic
       JOIN collections c ON ic.collection_id = c.id
       JOIN wastes w ON ic.waste_id = w.id
       WHERE c.volunteer_id = $1`,
      [userId],
    );

    // Total des points dépensés via les donations
    const spentResult = await pool.query(
      `SELECT COALESCE(SUM(donated_points), 0) AS total_spent
       FROM donations
       WHERE volunteer_id = $1`,
      [userId],
    );

    const totalEarned = parseInt(earnedResult.rows[0].total_earned);
    const totalSpent = parseInt(spentResult.rows[0].total_spent);
    const availablePoints = totalEarned - totalSpent;

    res.json({
      total_earned: totalEarned,
      total_spent: totalSpent,
      available_points: availablePoints,
    });
  } catch (err) {
    console.error("Erreur calcul points :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST : effectuer un don
// Vérifie que le bénévole a assez de points avant d'enregistrer
router.post("/", async (req, res) => {
  const { volunteer_id, association_id, donated_points } = req.body;

  try {
    // Vérification des points disponibles
    const earnedResult = await pool.query(
      `SELECT COALESCE(SUM(ic.quantity * w.points), 0) AS total_earned
       FROM is_collected ic
       JOIN collections c ON ic.collection_id = c.id
       JOIN wastes w ON ic.waste_id = w.id
       WHERE c.volunteer_id = $1`,
      [volunteer_id],
    );

    const spentResult = await pool.query(
      `SELECT COALESCE(SUM(donated_points), 0) AS total_spent
       FROM donations
       WHERE volunteer_id = $1`,
      [volunteer_id],
    );

    const availablePoints =
      parseInt(earnedResult.rows[0].total_earned) -
      parseInt(spentResult.rows[0].total_spent);

    // Refus si points insuffisants
    if (availablePoints < donated_points) {
      return res.status(400).json({
        error: `Points insuffisants. Vous avez ${availablePoints} points disponibles.`,
      });
    }

    // Enregistrement du don
    const result = await pool.query(
      `INSERT INTO donations (volunteer_id, association_id, donated_points, donation_date)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [volunteer_id, association_id, donated_points],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur donation :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
