const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    // chercher l'utilisateur par son email
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
    const isPasswordValid = await bcrypt.compare(password, volunteer.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // créer le token JWT
    const token = jwt.sign(
      { id: volunteer.id, email: volunteer.email, role: volunteer.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    // connexion réussie
    // ne pas envoyer le mot de passe dans la réponse
    const { password: _, ...volunteerData } = volunteer;

    res.json({
      message: "Connexion réussie",
      token: token,
      user: {
        id: volunteerData.id,
        firstname: volunteerData.firstname,
        lastname: volunteerData.lastname,
        email: volunteerData.email,
        role: volunteerData.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
