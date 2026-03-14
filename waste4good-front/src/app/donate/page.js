"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import layoutStyles from "../styles/layout.module.css";
import { useState, useEffect } from "react";

export default function DonatePage() {
  const [associations, setAssociations] = useState([]); // État pour stocker les associations
  const [loading, setLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [points, setPoints] = useState(null); // points disponibles
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  // fetch des associations
  useEffect(() => {
    async function fetchAssociations() {
      try {
        // const response = await fetch("http://localhost:3001/associations");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/associations`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAssociations(data);
      } catch (e) {
        console.error("Failed to fetch associations:", e);
        setError(
          "Impossible de charger les associations. Veuillez réessayer plus tard.",
        );
      } finally {
        setLoading(false); // Arrête le chargement, que ce soit un succès ou une erreur
      }
    }

    fetchAssociations();
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois après le premier rendu

  // fetch des points disponibles
  useEffect(() => {
    const fetchPoints = async () => {
      const userId = sessionStorage.getItem("userId");
      console.log("userId :", userId);
      if (!userId) return;
      try {
        const res = await fetch(`${API}/donations/points/${userId}`);
        const data = await res.json();
        setPoints(data);
      } catch (e) {
        console.error("Erreur fetch points :", e);
      }
    };
    fetchPoints();
  }, []);

  // Disparition automatique des messages après 4 secondes
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // ── Effectuer un don ──────────────────────────────────────────────────────
  const handleDonate = async (association) => {
    console.log("association reçue :", association); // ← ajoute ceci
    console.log("association.id :", association.id);
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const confirmDon = confirm(
      `Confirmer le don de ${association.points} points à ${association.name} ?`,
    );
    if (!confirmDon) return;

    try {
      const res = await fetch(`${API}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: parseInt(userId),
          association_id: association.id,
          donated_points: association.points,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(`❌ ${data.error}`);
        return;
      }

      // Mise à jour des points après le don
      const updatedPoints = await fetch(`${API}/donations/points/${userId}`);
      setPoints(await updatedPoints.json());

      setSuccessMessage(
        `✅ Don de ${association.points} pts à ${association.name} effectué !`,
      );
    } catch (e) {
      console.error("Erreur donation :", e);
      setErrorMessage("❌ Une erreur est survenue. Veuillez réessayer.");
    }
  };
  // ─────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={layoutStyles.container}>
        <h1 className={styles.title}>Chargement des associations...</h1>
        <p>Merci de patienter.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={layoutStyles.container}>
        <h1 className={styles.title}>Erreur</h1>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Banner */}
      <div className="relative w-full h-87.5">
        <Image
          src="/images/banner-page-donate.png"
          alt="Banner page donations associations"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className={layoutStyles.container}>
        <h6 className={styles.pageTitle}>Faire un Don</h6>{" "}
        <h3 className="text-center text-4xl mb-8">
          Faites un don à l&apos;association de votre choix
        </h3>
        {/* Messages de succès / erreur */}
        {successMessage && (
          <div className={layoutStyles.success_message}>{successMessage}</div>
        )}
        {errorMessage && (
          <div className={layoutStyles.error_message}>{errorMessage}</div>
        )}
        {/* ── Bloc points disponibles ── */}
        {points !== null && (
          <div className="flex flex-col items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4 mb-8">
            <p className="text-sm text-emerald-700 font-semibold uppercase tracking-wide">
              Mes points disponibles
            </p>
            <p className="text-4xl font-bold text-emerald-600">
              🌱 {points.available_points} pts
            </p>
            <p className="text-xs text-gray-500">
              {points.total_earned} pts gagnés · {points.total_spent} pts
              dépensés
            </p>
          </div>
        )}
        {/* Grid pour les cartes d'associations */}
        <div className={styles.associationsGrid}>
          {associations.length > 0 ? (
            associations.map((association) => (
              <div key={association.id} className={styles.associationCard}>
                {/* Vérifiez si l'objet association a une propriété imageUrl */}
                {association.imageUrl && (
                  <Image
                    src={association.imageUrl}
                    alt={association.name}
                    width={300} // Adapter la largeur et la hauteur
                    height={200}
                    className={styles.associationImage}
                  />
                )}
                <h2 className={styles.associationName}>{association.name}</h2>
                <p className={styles.associationDescription}>
                  {association.description}
                </p>

                {/* Coût du don en points et équivalent euros */}

                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm font-semibold text-emerald-600">
                    {association.points} pts →{" "}
                    {association.points_conversion_euro}€
                  </p>
                  <button
                    onClick={() => handleDonate(association)}
                    disabled={
                      points === null ||
                      points.available_points < association.points
                    }
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors
                      ${
                        points !== null &&
                        points.available_points >= association.points
                          ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                    {points !== null &&
                    points.available_points >= association.points
                      ? "💚 Faire un don"
                      : "Points insuffisants"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune association disponible pour le moment.</p>
          )}
        </div>
        <div>
          <p className="text-center text-2xl font-bold text-gray-500 mt-8">
            🙏 Merci pour vos dons
          </p>
        </div>
      </div>
    </>
  );
}
