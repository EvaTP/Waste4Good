require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("./db");

async function hashPasswords() {
  try {
    // Récupérer tous les volunteers
    const result = await pool.query("SELECT id, password FROM volunteers");

    for (const volunteer of result.rows) {
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(volunteer.password, 10);

      // Mettre à jour dans la base
      await pool.query("UPDATE volunteers SET password = $1 WHERE id = $2", [
        hashedPassword,
        volunteer.id,
      ]);

      console.log(`Mot de passe hashé pour l'utilisateur ID ${volunteer.id}`);
    }

    console.log("Tous les mots de passe ont été hashés !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur :", error);
    process.exit(1);
  }
}

hashPasswords();
