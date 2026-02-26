const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const month = parseInt(req.query.month); // Récupérer le mois depuis les paramètres de requête
  const year = parseInt(req.query.year); // Récupérer l'année depuis les paramètres de requête
  // const { month, year } = req.query; // Récupérer les paramètres de mois et d'année
  try {
    const result = await pool.query(
      `SELECT w.value AS type, SUM(ic.quantity) AS total_quantity
       FROM is_collected ic
       JOIN collections c ON ic.collection_id = c.id
       JOIN volunteers v ON c.volunteer_id = v.id
       JOIN wastes w ON ic.waste_id = w.id
       WHERE v.id = $1
        AND EXTRACT(MONTH FROM c.created_at) = $2
        AND EXTRACT(YEAR FROM c.created_at) = $3
       GROUP BY v.id, w.value`,
      [userId, month, year],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des collectes" });
  }
});

module.exports = router;
