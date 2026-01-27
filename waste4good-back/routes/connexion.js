const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
router.use(express.json());

router.post("/connexion", async (req, res) => {
  try {
    const { email, password } = req.body;
    // vérifier que email et password sont fournis
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "L'email et le mot de passe sont requis." });
    }

    // chercher l'utilisation par son email
    const result = await pool.query(
      `SELECT * FROM volunteers WHERE email = $1`,
      [email],
    );
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }
    const volunteer = result.rows[0];

    // comparer le mot de passe fourni avec le mot de passe haché en base
    const passwordMatch = await bcrypt.compare(password, volunteer.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // connexion réussie
    // ne pas envoyer le mot de passe dans la réponse
    const { password: _, ...volunteerData } = volunteer;

    res.json({
      message: "Connexion réussie",
      user: volunteerData,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
