const express = require("express");
const pool = require("../db");
const router = express.Router();
router.use(express.json()); // a ne pas oublier pour les POST

// GET : Toutes les collectes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM collections");
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des collectes" });
  }
});

// GET : récupère une collecte par son ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM collections WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Collecte non trouvée" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la collecte" });
  }
});

// POST : création d'une nouvelle collecte en l'assignant à un bénévole
router.post("/", async (req, res) => {
  const { volunteer_id, city_id, date, waste_items } = req.body;

  console.log("🗂️ Body reçu :", req.body); // 👈 vérifier ce qui arrive du front
  console.log("🚮 waste_items :", waste_items); // 👈 vérifier que ce n'est pas vide/undefined

  // vérifier que les données obligatoires sont présentes
  if (!volunteer_id || !city_id || !waste_items) {
    return res
      .status(400)
      .json({ error: "volunteer_id, city_id et waste_items requis" });
  }
  // Si aucune date de saisie, on utilise la date du jour
  const collectionDate = date ? new Date(date) : new Date();

  try {
    // Créer la collecte et l'associer au bénévole
    const collectionResult = await pool.query(
      "INSERT INTO collections (volunteer_id, city_id, created_at) VALUES ($1, $2, $3) RETURNING *",
      [volunteer_id, city_id, collectionDate],
      // $1, $2 sont des valeurs qui protègent des injections SQL : cyberattack -> insertion de code infecté qui permet
      // de récuperer/visualiser les données dans une table
    );
    const collectionId = collectionResult.rows[0].id;
    console.log("Collection créée avec id :", collectionId); // 👈

    // insérer chaque déchet collecté
    for (const item of waste_items) {
      console.log("Insertion is_collected :", item); // 👈 vérifier chaque item
      await pool.query(
        "INSERT INTO is_collected (collection_id, waste_id, quantity, collected_at) VALUES ($1, $2, $3, $4)",
        [collectionId, item.waste_id, item.quantity, collectionDate],
      );
    }
    res.status(201).json({
      message: "Collecte enregistrée !",
      collection_id: collectionId,
    });
  } catch (err) {
    console.error("Erreur détaillée:", err);
    res.status(500).json({
      error: "Erreur serveur",
      details: err.message,
    });
  }
});

// PUT : Mise à jour d'une collecte existante
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE collections SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Collecte non trouvée" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la collecte" });
  }
});

// DELETE : Supprime une collecte
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM collections WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Collecte non trouvée" });
    }
    res.json({ message: "Collection supprimée" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la collecte" });
  }
});

module.exports = router;
