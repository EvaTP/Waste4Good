import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Banner avec H1 + CTA superposés */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/banner-friends2.png"
          alt="Banner Waste4Good"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Overlay avec texte */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-white text-6xl font-bold">
            Bienvenue sur Waste4Good
          </h1>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 transition-colors duration-300">
            Nous rejoindre
          </button>
        </div>
      </div>

      {/* Contenu de page */}
      <main className="px-8 sm:px-20 py-12">
        <h2 className="text-6xl font-bold text-center mt-8 mb-6">
          DÉCOUVREZ NOS ACTIONS
        </h2>
      </main>
    </>
  );
}
