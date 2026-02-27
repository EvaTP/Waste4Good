"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavBarMngt() {
  return (
    <nav className="w-full bg-emerald-700 py-6">
      <div className="flex flex-row justify-center items-center gap-10">
        <Link
          href="/manage-users"
          className="flex items-center gap-2 text-white font-semibold hover:text-emerald-200 transition-colors"
        >
          <Image
            src="/sprout-white.svg"
            alt="icon-leaf"
            width={25}
            height={25}
            priority
          />
          <span>Gestion des bénévoles</span>
        </Link>
        <Link
          href="/leaderboard"
          className="flex items-center gap-2 text-white font-semibold hover:text-emerald-200 transition-colors"
        >
          <Image
            src="/trophy-white.svg"
            alt="icon-trophy"
            width={25}
            height={25}
            priority
          />
          <span>Leaderboard</span>
        </Link>
      </div>
    </nav>
  );
}
