"use client";
import Image from "next/image";
// import Link from "next/link";
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
//URL API Express = "http://localhost:3001/volunteers";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [collectionsData, setCollectionsData] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  // Récupérer le nom complet et le prénom
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      setFirstName(storedUserName.split(" ")[0]);
    }
  }, []);

  // Récupérer les données de collecte (se relance à chaque changement de mois ou d'année)
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
      <div className={layoutStyles.main_content}>
        <div className={layoutStyles.card}>
          <div className={styles.dashboard_header}>
            <h2 className={layoutStyles.card_header}>
              Bonjour {firstName} 👋 !
            </h2>

            {/* navigateur de mois */}
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

            {/* Bouton "Enregistrer une collecte" pour afficher le formulaire */}
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

            {/* Affichage conditionnel du formulaire */}
            {showForm && (
              <CollectionForm onSuccess={() => setShowForm(false)} />
            )}

            {/* calendrier */}
            {/* <div className={styles.month_navigation}>
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
            </div> */}

            {/* collectes par mois */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
