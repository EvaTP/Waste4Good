
const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/:firstname', async (req, res) => {
  const { firstname } = req.params;
  try {
    const result = await pool.query(
      `SELECT w.name AS type, SUM(ic.quantity) AS total_quantity
       FROM is_collected ic
       JOIN collections c ON ic.collection_id = c.id
       JOIN volunteers v ON c.volunteer_id = v.id
       JOIN wastes w ON ic.waste_id = w.id
       WHERE v.firstname = $1
       GROUP BY v.id, w.name`,
      [firstname]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des collectes' });
  }
});


module.exports = router;
