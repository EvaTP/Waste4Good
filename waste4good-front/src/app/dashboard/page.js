"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import layoutStyles from "../styles/layout.module.css";
import { useState, useEffect } from "react";

//URL API Express = "http://localhost:3001/volunteers";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [collectionsData, setCollectionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://waste4good-back.vercel.app/volunteers",
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

  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    if (storedName) {
      setFirstName(storedName);
    }
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const storedFirstName = localStorage.getItem("firstName");
      if (!storedFirstName) return;

      const response = await fetch(
        `https://waste4good-back.vercel.app/dashboard/${storedFirstName}`,
      );
      const data = await response.json();

      console.log("🦊 DASHBOARD DATA :", data);

      setCollectionsData(data);
    };
    fetchDashboardData();
  }, []);

  // retrouver la quantité de déchets collectés par type
  const getQuantityByType = (type) => {
    const item = collectionsData.find((entry) => entry.type === type);
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
      <p className="text-3xl font-semibold text-left ml-8 mt-6 mb-4">
        Dashboard de : {userName}
      </p>
      <div className={layoutStyles.main_content}>
        <div className={layoutStyles.card}>
          <div className={styles.dashboard_header}>
            <h2 className={layoutStyles.card_header}>
              Bonjour {firstName} 👋 !
            </h2>
            {/* calendrier */}
            <div className={styles.month_navigation}>
              <button className={styles.month_nav_btn}>Previous</button>
              <span className={styles.current_month}></span>
              <button className={styles.month_nav_btn}>Next</button>
            </div>
            {/* collectes */}
            <h3 className={styles.section_title}>Mes collectes récentes</h3>
            <div className={styles.waste_grid}>
              <div className={styles.waste_card}>
                <div className={`${styles.waste_icon} ${styles.badge_organic}`}>
                  <Image
                    src="/waste-cigarette.svg"
                    alt="icon-user"
                    width={25}
                    height={25}
                    priority
                  />
                </div>
                <div className={styles.waste_info}>
                  <h3>Mégots de cigarette</h3>
                  <p className={styles.waste_count}>
                    {getQuantityByType("Mégots de cigarette")}
                  </p>
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
                <div className={styles.waste_icon}>
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
