"use client";
import styles from "../page.module.css";
// import layoutStyles from "../../styles/layout.module.css";

export default function ItemLeaderboard({ volunteer }) {
  return (
    <div className={styles.volunteer_item}>
      <div className={styles.volunteer_info}>
        <h3 className={styles.volunteer_info_name}>{volunteer.firstname}</h3>

        {/* Collectes */}
        <p className={styles.volunteer_info_p}>
          {volunteer.total_collections} collecte
          {volunteer.total_collections > 1 ? "s" : ""}
        </p>
        {/* Donations */}
        <p className={styles.volunteer_info_p}>
          💚 {volunteer.total_donated_points} pts donnés
        </p>
        <p className={styles.volunteer_info_p}>
          🌿 {volunteer.associations_supported}
        </p>
      </div>
    </div>
  );
}
