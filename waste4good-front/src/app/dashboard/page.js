"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import layoutStyles from "../styles/layout.module.css";
import { useState, useEffect } from "react";
import CollectionForm from "../general-components/CollectionForm";

const MOIS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [collectionsData, setCollectionsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [points, setPoints] = useState(null); // points disponibles
  const [donationsHistory, setDonationsHistory] = useState([]); // historique des dons

  // *********** navigation mois précédent/suivant ******************
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [year, setYear] = useState(today.getFullYear());

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  // ***************************************************************

  // fetch accès à la page (vérifie que le token est valide)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/volunteers`,
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Récupérer le nom et le prénom depuis le sessionStorage pour l'afficher dans le dashboard
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      setFirstName(storedUserName.split(" ")[0]);
    }
  }, []);

  // Récupérer les données de collecte par mois (se relance à chaque changement de mois ou d'année)
  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/${userId}?month=${month + 1}&year=${year}`,
        );
        const data = await response.json();
        console.log("🦊 DASHBOARD DATA :", data); // on voit en console tous les déchets collectés
        setCollectionsData(data);
      } catch (error) {
        console.error("Erreur fetch dashboard:", error);
      }
    };
    fetchDashboardData();
  }, [month, year]);

  // ── Fetch points disponibles + historique des dons ────────────────────────
  useEffect(() => {
    const fetchPointsAndHistory = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;
      try {
        const [pointsRes, historyRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/donations/points/${userId}`,
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/donations/history/${userId}`,
          ),
        ]);
        setPoints(await pointsRes.json());
        setDonationsHistory(await historyRes.json());
      } catch (error) {
        console.error("Erreur fetch points/dons :", error);
      }
    };
    fetchPointsAndHistory();
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  // retrouver la quantité de déchets collectés par type
  const getQuantityByType = (type) => {
    if (!Array.isArray(collectionsData)) return 0; // sécurité : on commence par vérifier que collectionsData est un tableau

    const typeMapping = {
      Mégots: "cigarette",
      Plastique: "plastic",
      Verre: "glass",
      Electronique: "electronic",
      Métal: "metal",
      Autre: "other",
      Textile: "textile",
    };

    const dbType = typeMapping[type];
    const item = collectionsData.find((entry) => entry.type === dbType);
    return item ? item.total_quantity : 0;
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data)
    return (
      <p className="text-center text-2xl mt-4">
        🔒 Page accessible après connexion
      </p>
    );

  return (
    <div className="app_container">
      <p className="text-3xl font-semibold text-left ml-14 mt-10 mb-4">
        Dashboard de : {userName}
      </p>
      <h2 className={layoutStyles.card_header}>Bonjour {firstName} 👋 !</h2>

      <div className={layoutStyles.main_content}>
        <div className="flex flex-col lg:flex-row gap-10 px-6 w-full max-w-7xl mx-auto">
          {/* ── Ligne du haut : collectes + dons côte à côte ── */}

          {/* ── Card collectes (gauche) (2/3) ── */}
          <div className="flex-2 bg-white rounded-lg shadow p-6">
            {/* Navigateur de mois */}
            <div className={styles.month_navigation}>
              <button className={styles.month_nav_btn} onClick={prevMonth}>
                <Image
                  src="/calendar-minus.svg"
                  alt="calendar-previous"
                  width={25}
                  height={25}
                  priority
                />
                Précédent
              </button>
              <span className={styles.current_month}>
                {MOIS_FR[month]} {year}
              </span>
              <button className={styles.month_nav_btn} onClick={nextMonth}>
                Suivant
                <Image
                  src="/calendar-plus.svg"
                  alt="calendar-next"
                  width={25}
                  height={25}
                  priority
                />
              </button>
            </div>

            {/* Bouton enregistrer une collecte */}
            <div className="flex justify-center my-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Image
                  src="/package-plus-white.svg"
                  alt="Ajouter"
                  width={30}
                  height={30}
                />
                {showForm ? "Annuler" : "Enregistrer une collecte"}
              </button>
            </div>

            {showForm && (
              <CollectionForm onSuccess={() => setShowForm(false)} />
            )}

            {/* Collectes par mois */}
            <h3 className={styles.section_title}>
              Déchets collectés en {MOIS_FR[month]} {year}
            </h3>
            <div className={styles.waste_grid}>
              <div className={styles.waste_card}>
                <div
                  className={`${styles.waste_icon} ${styles.badge_cigarette}`}
                >
                  <Image
                    src="/waste-cigarette.svg"
                    alt="mégots"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Mégots de cigarette</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Mégots")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_plastic}`}>
                  <Image
                    src="/waste-plastic-package.svg"
                    alt="plastique"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Plastique</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Plastique")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_glass}`}>
                  <Image
                    src="/waste-glass-wine.svg"
                    alt="verre"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Verre</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Verre")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_metal}`}>
                  <Image
                    src="/waste-metal-trash.svg"
                    alt="métal"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Métal</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Métal")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_textile}`}>
                  <Image
                    src="/waste-shirt.svg"
                    alt="textile"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Textile</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Textile")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div
                  className={`${styles.waste_icon} ${styles.badge_electronic}`}
                >
                  <Image
                    src="/waste-smartphone.svg"
                    alt="électronique"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Electronique</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Electronique")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_other}`}>
                  <Image
                    src="/waste-circle-help.svg"
                    alt="autre"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Autre</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Autre")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card dons (droite) (1/3) ── */}
          <div className="flex-1 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            {/* Bloc points disponibles */}
            {points !== null && (
              <div className="flex flex-col items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4">
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
                <Link
                  href="/donate"
                  className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                >
                  💚 Convertir mes points en dons
                </Link>
              </div>
            )}

            {/* Historique des dons */}
            <h3 className="text-lg font-semibold text-gray-700 mt-2">
              Historique de mes dons
            </h3>
            {donationsHistory.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">
                🌿 Aucun don effectué pour le moment
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {donationsHistory.map((don, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {don.association_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(don.donation_date).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                    </div>
                    <p className="text-emerald-600 font-bold text-sm">
                      -{don.donated_points} pts
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className={layoutStyles.card}>
          <div className={styles.dashboard_header}>
            <h2 className={layoutStyles.card_header}>
              Bonjour {firstName} 👋 !
            </h2>

            {/* navigateur de mois */
}
{
  /* <div className={styles.month_navigation}>
              <button className={styles.month_nav_btn} onClick={prevMonth}>
                <Image
                  src="/calendar-minus.svg"
                  alt="calendar-previous"
                  width={25}
                  height={25}
                  priority
                />
                Précédent
              </button>
              <span className={styles.current_month}>
                {MOIS_FR[month]} {year}
              </span>
              <button className={styles.month_nav_btn} onClick={nextMonth}>
                Suivant
                <Image
                  src="/calendar-plus.svg"
                  alt="calendar-next"
                  width={25}
                  height={25}
                  priority
                />
              </button>
            </div> */
}

{
  /* Bouton "Enregistrer une collecte" pour afficher le formulaire */
}

{
  /* Affichage conditionnel du formulaire */
}
{
  /* {showForm && (
              <CollectionForm onSuccess={() => setShowForm(false)} />
            )} */
}

{
  /* calendrier */
}
{
  /* <div className={styles.month_navigation}>
              <button className={styles.month_nav_btn}>
                <Image
                  src="/calendar-minus.svg"
                  alt="calendar-previous"
                  width={25}
                  height={25}
                  priority
                />
                Previous
              </button>
              <span className={styles.current_month}></span>
              <button className={styles.month_nav_btn}>
                Next
                <Image
                  src="/calendar-plus.svg"
                  alt="calendar-next"
                  width={25}
                  height={25}
                  priority
                />
              </button>
            </div> */
}

{
  /* collectes par mois */
}
{
  /* <h3 className={styles.section_title}>
              Déchets collectés en {MOIS_FR[month]} {year}
            </h3>
            <div className={styles.waste_grid}>
              <div className={styles.waste_card}>
                <div
                  className={`${styles.waste_icon} ${styles.badge_cigarette}`}
                >
                  <Image
                    src="/waste-cigarette.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <div>
                    <h3>Mégots de cigarette</h3>
                  </div>
                  <div>
                    <p className={styles.waste_count}>
                      {getQuantityByType("Mégots de cigarette")}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_plastic}`}>
                  <Image
                    src="/waste-plastic-package.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Plastique</h3>
                  <p className={styles.waste_count}>
                    {" "}
                    {getQuantityByType("Plastique")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_glass}`}>
                  <Image
                    src="/waste-glass-wine.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Verre</h3>
                  <p className={styles.waste_count}>
                    {" "}
                    {getQuantityByType("Verre")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_metal}`}>
                  <Image
                    src="/waste-metal-trash.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Métal</h3>
                  <p className={styles.waste_count}>
                    {" "}
                    {getQuantityByType("Métal")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_textile}`}>
                  <Image
                    src="/waste-shirt.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Textile</h3>
                  <p className={styles.waste_count}>
                    {" "}
                    {getQuantityByType("Textile")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div
                  className={`${styles.waste_icon} ${styles.badge_electronic}`}
                >
                  <Image
                    src="/waste-smartphone.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Electronique</h3>
                  <p className={styles.waste_count}>
                    {" "}
                    {getQuantityByType("Electronique")}
                  </p>
                </div>
              </div>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_other}`}>
                  <Image
                    src="/waste-circle-help.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Autre</h3>
                  <p className={styles.waste_count}>
                    {" "}
                    {getQuantityByType("Autre")}
                  </p>
                </div>
              </div>
            </div>
          </div> */
}
{
  /* </div> */
}

// </div>
//   );
// }
