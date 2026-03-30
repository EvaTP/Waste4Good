// Route avec toutes les associations
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT 
        v.firstname,
        v.lastname,
        SUM(ic.quantity) AS total_collections,
        COALESCE(SUM(d.donated_points), 0) AS total_donated_points,
        COALESCE(
          STRING_AGG(DISTINCT a.name, ', '), 
          'Aucun don'
        ) AS associations_supported
      FROM is_collected ic
      JOIN collections c ON c.id = ic.collection_id
      JOIN volunteers v ON v.id = c.volunteer_id
      LEFT JOIN donations d ON d.volunteer_id = v.id
      LEFT JOIN associations a ON a.id = d.association_id
      GROUP BY v.id, v.firstname, v.lastname
      ORDER BY total_collections DESC
    `);
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
