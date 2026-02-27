"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import layoutStyles from "@/app/styles/layout.module.css";

export default function NavBar() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsConnected(!!userId); // Convertit en boolean
  }, []);

  const handleLogout = () => {
    localStorage.clear();
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

// export default function NavBar() {

//   const router = useRouter();
//   const handleLogout = () => {
//     // Vider le localStorage
//     localStorage.clear();

//     // rediriger vers la homepage
//     router.push("/");
//   };
//   return (
//     <header className={layoutStyles.NavBar}>
//       <div className={layoutStyles.NavBar_container}>
//         {/* LEFT: logo + titre */}
//         <div className={layoutStyles.NavBar_left}>
//           <Link href="/">
//             <Image
//               src="/logo-W4G.png"
//               alt="logo-waste4good"
//               width={85}
//               height={80}
//               priority
//               style={{ objectFit: "contain" }}
//             />
//           </Link>

//           <Link href="/">
//             <Image
//               src="/title-W4G.png"
//               alt="title-waste4good"
//               width={120}
//               height={110}
//               priority
//               style={{ objectFit: "contain" }}
//             />
//           </Link>

//           {/* <span className={layoutStyles.NavBar_title}>Waste4Good</span> */}
//           <p className=" text-white text-base font-bold mt-2">
//             Transformer les déchets en impact positif
//           </p>
//         </div>

//         {/* RIGHT: liens */}
//         <nav className={layoutStyles.NavBar_right}>
//           <Link href="/connexion" className={layoutStyles.NavBar_link}>
//             <Image
//               src="/log-in-white.svg"
//               alt="icon-login"
//               width={20}
//               height={20}
//             />
//             <span>Connexion</span>
//           </Link>

//           <Link href="/dashboard" className={layoutStyles.NavBar_link}>
//             <Image
//               src="/sprout-white.svg"
//               alt="icon-leaf"
//               width={20}
//               height={20}
//             />
//             <span>Dashboard</span>
//           </Link>

//           <Link href="/donate" className={layoutStyles.NavBar_link}>
//             <Image
//               src="/heart-white.svg"
//               alt="icon-heart"
//               width={20}
//               height={20}
//             />
//             <span>Dons</span>
//           </Link>

//           <Link href="/profil" className={layoutStyles.NavBar_link}>
//             <Image
//               src="/user-white.svg"
//               alt="icon-user"
//               width={25}
//               height={25}
//             />
//             <span>Mon profil</span>
//           </Link>

//           {/* Bouton de déconnexion */}
//           <button onClick={handleLogout} className={layoutStyles.NavBar_link}>
//             <Image
//               src="/log-out-white.svg"
//               alt="icon-logout"
//               width={20}
//               height={20}
//             />
//             <span>Déconnexion</span>
//           </button>
//         </nav>
//       </div>
//     </header>

//     // <div className="app_container">
//     //   <header className={layoutStyles.NavBar}>
//     //     {/* TOP BAR (logo + titre + liens) */}
//     //     <div className={layoutStyles.NavBar_top}>
//     //       <div className={layoutStyles.NavBar_container}>
//     //         {/* LEFT */}
//     //         <div className={layoutStyles.NavBar_left}>
//     //           <Image
//     //             src="/logo-W4G.png"
//     //             alt="logo-waste4good"
//     //             width={55}
//     //             height={50}
//     //             priority
//     //           />
//     //           <span className={layoutStyles.NavBar_title}>Waste4Good</span>
//     //         </div>

//     //         {/* RIGHT */}
//     //         <nav className={layoutStyles.NavBar_right}>
//     //           <Link href="/dashboard" className={layoutStyles.NavBar_link}>
//     //             <Image src="/sprout.svg" alt="" width={20} height={20} />
//     //             <span>Dashboard</span>
//     //           </Link>
//     //           <Link href="/donate" className={layoutStyles.NavBar_link}>
//     //             <Image src="/heart.svg" alt="" width={20} height={20} />
//     //             <span>Dons</span>
//     //           </Link>
//     //           <Link href="/profil" className={layoutStyles.NavBar_link}>
//     //             <Image
//     //               src="/user.svg"
//     //               alt="icon-user"
//     //               width={25}
//     //               height={25}
//     //               priority
//     //             />
//     //             <span>Mon Profil</span>
//     //           </Link>
//     //         </nav>
//     //       </div>
//     //     </div>
//     //   </header>

//     //   {/* BOTTOM BAR (autres liens) */}
//     //   <div>
//     //     <nav className={layoutStyles.NavBar}>
//     //       <div className={layoutStyles.NavBar_container}>
//     //         <Link href="/dashboard" className={layoutStyles.NavBar_link}>
//     //           <Image
//     //             src="/sprout.svg"
//     //             alt="icon-leaf"
//     //             width={25}
//     //             height={25}
//     //             priority
//     //           />
//     //           <span>Dashboard</span>
//     //         </Link>
//     //         <Link href="/#" className={layoutStyles.NavBar_link}>
//     //           <Image
//     //             src="/package-plus.svg"
//     //             alt="icon-package"
//     //             width={25}
//     //             height={25}
//     //             priority
//     //           />
//     //           <span>Collectes</span>
//     //         </Link>
//     //         <Link href="/donate" className={layoutStyles.NavBar_link}>
//     //           <Image
//     //             src="/heart.svg"
//     //             alt="icon-heart"
//     //             width={25}
//     //             height={25}
//     //             priority
//     //           />
//     //           <span>Dons</span>
//     //         </Link>
//     //       </div>
//     //     </nav>
//     //   </div>
//     // </div>
//   );
// }
