"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import layoutStyles from "../styles/layout.module.css";
import ItemLeaderboard from "./components/itemLeaderboard";
import NavBarMngt from "../general-components/NavBarMngt";
import { useState, useEffect } from "react";

export default function VolunteersLeaderboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`,
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

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="app_container">
      <NavBarMngt />

      <main className={layoutStyles.main_content}>
        <div className={layoutStyles.card}>
          <h2 className={layoutStyles.card_header}>
            <Image
              src="/trophy.svg"
              alt="icon-trophy"
              width={25}
              height={25}
              priority
            />
            &nbsp;&nbsp;Leaderboard Global
          </h2>
          <div className={styles.leaderboard_container}>
            {data.map((volunteer) => (
              <ItemLeaderboard
                key={volunteer.firstname}
                volunteer={volunteer}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
