"use client";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "@/app/styles/layout.module.css";

export default function Footer() {
  return (
    <div className={layoutStyles.Footer_container}>
      {/* Container principal : 5 div en colonne sur mobile, flex-row sur desktop */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full mt-4">
        {/* 1ère div : adresse */}
        <div className="flex-1 flex flex-col gap-2 ml-8">
          <Image
            src="/logo-W4G.png"
            alt="logo-waste4good"
            width={55}
            height={40}
            priority
          />
          <h4 className="font-semibold mt-4 mb-2">Adresse</h4>
          <p>
            123 Rue de l&apos;Hygiène,<br></br>75001 Paris,
            <br />
            France
          </p>
        </div>

        {/* 2ème div : liens utiles */}
        <div className="flex-1 flex flex-col gap-2">
          <h4 className="font-semibold mb-2">Liens utiles</h4>
          <Link href="/about" className="hover:underline">
            À propos
          </Link>
          <Link href="/donate" className="hover:underline">
            Faire un don
          </Link>
        </div>

        {/* 3ème div : services */}
        <div className="flex-1 flex flex-col gap-2">
          <h4 className="font-semibold mb-2">Services</h4>
          <Link href="/volunteer" className="hover:underline">
            Bénévolat
          </Link>
          <Link href="/events" className="hover:underline">
            Événements
          </Link>
        </div>

        {/* 4ème div : social */}
        <div className="flex-1 flex items-start p-6 gap-6">
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

        {/* 5ème div : boutons */}
        <div className="flex-1 flex flex-col items-center mt-4 gap-8 px-6">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-3 w-full md:w-48 transition-colors duration-200">
            Nous contacter
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-3 w-full md:w-48 transition-colors duration-200">
            Newsletter
          </button>
        </div>
      </div>

      {/* 6ème div : texte info pleine largeur */}
      <div
        className={`${layoutStyles.info_text} mt-6 w-full text-center text-lg md:text-xl`}
      >
        🌱 Merci d'agir pour la planète. Vous faites partie du changement.
      </div>

      <div className="text-center">
        © 2026 Waste4Good. Tous droits réservés.
      </div>
    </div>
  );
}
