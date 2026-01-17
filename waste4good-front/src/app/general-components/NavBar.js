"use client";
import Image from "next/image";
import Link from "next/link";
import layoutStyles from "@/app/styles/layout.module.css";

export default function NavBar() {
  return (
    <header className={layoutStyles.NavBar}>
      <div className={layoutStyles.NavBar_container}>
        {/* LEFT: logo + titre */}
        <div className={layoutStyles.NavBar_left}>
          <Image
            src="/logo-W4G.png"
            alt="logo-waste4good"
            width={55}
            height={50}
            priority
          />
          <span className={layoutStyles.NavBar_title}>Waste4Good</span>
        </div>

        {/* RIGHT: liens */}
        <nav className={layoutStyles.NavBar_right}>
          <Link href="/dashboard" className={layoutStyles.NavBar_link}>
            <Image src="/sprout.svg" alt="icon-leaf" width={20} height={20} />
            <span>Dashboard</span>
          </Link>

          <Link href="/donate" className={layoutStyles.NavBar_link}>
            <Image src="/heart.svg" alt="icon-heart" width={20} height={20} />
            <span>Dons</span>
          </Link>

          <Link href="/profil" className={layoutStyles.NavBar_link}>
            <Image src="/user.svg" alt="icon-user" width={25} height={25} />
            <span>Mon profil</span>
          </Link>
        </nav>
      </div>
    </header>

    // <div className="app_container">
    //   <header className={layoutStyles.NavBar}>
    //     {/* TOP BAR (logo + titre + liens) */}
    //     <div className={layoutStyles.NavBar_top}>
    //       <div className={layoutStyles.NavBar_container}>
    //         {/* LEFT */}
    //         <div className={layoutStyles.NavBar_left}>
    //           <Image
    //             src="/logo-W4G.png"
    //             alt="logo-waste4good"
    //             width={55}
    //             height={50}
    //             priority
    //           />
    //           <span className={layoutStyles.NavBar_title}>Waste4Good</span>
    //         </div>

    //         {/* RIGHT */}
    //         <nav className={layoutStyles.NavBar_right}>
    //           <Link href="/dashboard" className={layoutStyles.NavBar_link}>
    //             <Image src="/sprout.svg" alt="" width={20} height={20} />
    //             <span>Dashboard</span>
    //           </Link>
    //           <Link href="/donate" className={layoutStyles.NavBar_link}>
    //             <Image src="/heart.svg" alt="" width={20} height={20} />
    //             <span>Dons</span>
    //           </Link>
    //           <Link href="/profil" className={layoutStyles.NavBar_link}>
    //             <Image
    //               src="/user.svg"
    //               alt="icon-user"
    //               width={25}
    //               height={25}
    //               priority
    //             />
    //             <span>Mon Profil</span>
    //           </Link>
    //         </nav>
    //       </div>
    //     </div>
    //   </header>

    //   {/* BOTTOM BAR (autres liens) */}
    //   <div>
    //     <nav className={layoutStyles.NavBar}>
    //       <div className={layoutStyles.NavBar_container}>
    //         <Link href="/dashboard" className={layoutStyles.NavBar_link}>
    //           <Image
    //             src="/sprout.svg"
    //             alt="icon-leaf"
    //             width={25}
    //             height={25}
    //             priority
    //           />
    //           <span>Dashboard</span>
    //         </Link>
    //         <Link href="/#" className={layoutStyles.NavBar_link}>
    //           <Image
    //             src="/package-plus.svg"
    //             alt="icon-package"
    //             width={25}
    //             height={25}
    //             priority
    //           />
    //           <span>Collectes</span>
    //         </Link>
    //         <Link href="/donate" className={layoutStyles.NavBar_link}>
    //           <Image
    //             src="/heart.svg"
    //             alt="icon-heart"
    //             width={25}
    //             height={25}
    //             priority
    //           />
    //           <span>Dons</span>
    //         </Link>
    //       </div>
    //     </nav>
    //   </div>
    // </div>
  );
}
