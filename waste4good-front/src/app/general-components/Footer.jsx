"use client";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "@/app/styles/layout.module.css";

export default function Footer() {
  return (
    <div className={layoutStyles.Footer_container}>
      {/* Container principal : 5 div en colonne sur mobile, flex-row sur desktop */}
      <div className={layoutStyles.Footer_main}>
        {/* 1ère div : adresse */}
        <div className={layoutStyles.Footer_section}>
          <Image
            src="/logo-W4G.png"
            alt="logo-waste4good"
            width={55}
            height={40}
            priority
          />
          <h4>Adresse</h4>
          <p>
            123 Rue de l&apos;Hygiène,
            <br />
            75001 Paris,
            <br />
            France
          </p>
        </div>

        {/* 2ème div : liens utiles */}
        <div className={layoutStyles.Footer_section}>
          <h4>Liens utiles</h4>
          <Link href="/asso">À propos</Link>
          <Link href="/partners">Nos partenaires</Link>
          <Link href="/donate">Faire un don</Link>
        </div>

        {/* 3ème div : services */}
        <div className={layoutStyles.Footer_section}>
          <h4>Services</h4>
          <Link href="/volunteer">Bénévolat</Link>
          <Link href="/events">Événements</Link>
        </div>

        {/* 4ème div : social */}
        <div className={layoutStyles.Footer_section}>
          <div className={layoutStyles.Footer_social}>
            <Image
              src="/linkedin-white.svg"
              alt="social-linkedin-waste4good"
              width={30}
              height={30}
              priority
            />
            <Image
              src="/facebook-white.svg"
              alt="social-facebook-waste4good"
              width={30}
              height={30}
              priority
            />
          </div>
        </div>

        {/* 5ème div : boutons */}
        <div className={layoutStyles.Footer_section}>
          <Link href="/asso" className={layoutStyles.footer_btn}>
            Nous contacter
          </Link>
          <Link href="/newsletter" className={layoutStyles.footer_btn}>
            Newsletter
          </Link>
          {/* <button className={layoutStyles.footer_btn}>Newsletter</button> */}
        </div>
      </div>

      {/* 6ème div : texte info pleine largeur de la page */}
      <div className={layoutStyles.info_text}>
        🌱 Merci d'agir pour la planète. Vous faites partie du changement.
      </div>

      {/* Copyright */}
      <div className={layoutStyles.footer_copyright}>
        © 2026 Waste4Good. Tous droits réservés.
      </div>
    </div>
  );
}
