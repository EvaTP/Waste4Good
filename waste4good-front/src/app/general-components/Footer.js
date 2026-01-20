"use client";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "@/app/styles/layout.module.css";

export default function Footer() {
  return (
    //<footer>
    <div className={layoutStyles.Footer_container}>
      <div className={layoutStyles.Footer_left}>
        <p className={layoutStyles.info_text}>
          🌱 Merci d&apos;agir pour la planète. Vous faites partie du
          changement.
        </p>
      </div>
    </div>
    //</footer>
  );
}
