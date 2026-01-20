import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Banner avec H1 superposé */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/banner-friends2.png"
          alt="Banner Waste4Good"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay avec texte */}
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold z-10">
          Bienvenue sur Waste4Good
        </h1>

        {/* Optionnel : overlay sombre pour mieux voir le texte */}
        <div className="absolute inset-0 bg-black/30 z-0" />
      </div>

      {/* Contenu de page en dessous */}
      <main className="px-8 sm:px-20 py-12">
        <p>Découvrez nos actions contre le gaspillage !</p>
      </main>
    </div>
  );
}
