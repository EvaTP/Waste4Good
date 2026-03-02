"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import layoutStyles from "@/app/styles/layout.module.css";

export default function NavBar() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Vérifier si l'utilisateur est connecté au chargement
  // useEffect(() => {
  //   const userId = sessionStorage.getItem("userId");
  //   setIsConnected(!!userId); // Convertit en boolean
  // }, []);

  useEffect(() => {
    const checkAuth = () => {
      const userId = sessionStorage.getItem("userId");
      const role = sessionStorage.getItem("userRole");
      setIsConnected(!!userId);
      setUserRole(role || "");
    };

    checkAuth(); // vérification au chargement

    window.addEventListener("storage", checkAuth); // écoute les changements
    return () => window.removeEventListener("storage", checkAuth); // nettoyage
  }, []);

  // Déconnexion : vider le sessionStorage, mettre à jour l'état et rediriger vers la page d'accueil
  const handleLogout = () => {
    sessionStorage.clear();
    setIsConnected(false); // Mettre à jour l'état
    router.push("/");
  };

  return (
    <header className={layoutStyles.NavBar}>
      <div className={layoutStyles.NavBar_container}>
        {/* LEFT: logo + titre */}
        <div className={layoutStyles.NavBar_left}>
          <Link href="/">
            <Image
              src="/logo-W4G.png"
              alt="logo-waste4good"
              width={85}
              height={80}
              priority
              style={{ objectFit: "contain" }}
            />
          </Link>

          <Link href="/">
            <Image
              src="/title-W4G.png"
              alt="title-waste4good"
              width={120}
              height={110}
              priority
              style={{ objectFit: "contain" }}
            />
          </Link>

          <p className="text-white text-base font-bold mt-2">
            Transformer les déchets en impact positif
          </p>
        </div>

        {/* RIGHT: liens dynamiques selon l'état de connexion */}
        <nav className={layoutStyles.NavBar_right}>
          {!isConnected ? (
            /* Liens pour utilisateurs NON connectés */
            <>
              <Link href="/connexion" className={layoutStyles.NavBar_link}>
                <Image
                  src="/log-in-white.svg"
                  alt="icon-login"
                  width={20}
                  height={20}
                />
                <span>Connexion</span>
              </Link>

              <Link href="/asso" className={layoutStyles.NavBar_link}>
                <Image
                  src="/heart-handshake-white.svg"
                  alt="icon-association"
                  width={20}
                  height={20}
                />
                <span>L'association</span>
              </Link>
            </>
          ) : (
            /* Liens pour utilisateurs CONNECTÉS */
            <>
              <Link href="/dashboard" className={layoutStyles.NavBar_link}>
                <Image
                  src="/sprout-white.svg"
                  alt="icon-leaf"
                  width={20}
                  height={20}
                />
                <span>Dashboard</span>
              </Link>

              <Link href="/donate" className={layoutStyles.NavBar_link}>
                <Image
                  src="/heart-white.svg"
                  alt="icon-heart"
                  width={20}
                  height={20}
                />
                <span>Dons</span>
              </Link>

              <Link href="/profil" className={layoutStyles.NavBar_link}>
                <Image
                  src="/user-white.svg"
                  alt="icon-user"
                  width={25}
                  height={25}
                />
                <span>Mon profil</span>
              </Link>

              {/* Liens pour utilisateurs CONNECTÉS avec rôle ADMIN */}
              {isConnected && userRole === "admin" && (
                <Link href="/manage-users" className={layoutStyles.NavBar_link}>
                  <Image
                    src="/user-star-white.svg"
                    alt="icon-admin"
                    width={20}
                    height={20}
                  />
                  <span>Administration</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={layoutStyles.NavBar_link}
              >
                <Image
                  src="/log-out-white.svg"
                  alt="icon-logout"
                  width={20}
                  height={20}
                />
                <span>Déconnexion</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
