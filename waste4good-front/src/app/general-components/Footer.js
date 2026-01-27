"use client";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "@/app/styles/layout.module.css";

export default function Footer() {
  return (
    <div className={layoutStyles.Footer_container}>
      <div>
        <p className={layoutStyles.info_text}>
          🌱 Merci d&apos;agir pour la planète. Vous faites partie du
          changement.
        </p>
      </div>

      <div className="flex items-center gap-6 mr-6">
        <Image
          src="/linkedin-white.svg"
          alt="social-linkedin-waste4good"
          width={30}
          height={30}
          className="opacity-80 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          priority
        />
        <Image
          src="/facebook-white.svg"
          alt="social-facebook-waste4good"
          width={30}
          height={30}
          className="opacity-80 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          priority
        />
      </div>
    </div>
  );
}
