import Image from "next/image";
import PartnersGrid from "@/app/general-components/PartnersGrid";

export default function Home() {
  return (
    <>
      {/* Banner avec H1 + CTA superposés */}
      <div className="relative w-full h-100">
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
      <main className="min-h-dvh sm:px-20 py-12">
        <h2 className="text-6xl font-bold text-center mt-8 mb-6">
          DÉCOUVREZ NOS ACTIONS
        </h2>

        <div>
          <p className="text-2xl text-center max-w-4xl mx-auto">
            Waste4Good est une plateforme dédiée à la collecte de déchets dans
            les espaces publics. <br />
            Notre mission est de mobiliser les citoyens pour un environnement
            plus propre et plus sain. <br />
            Rejoignez-nous dans cette aventure écologique et contribuez à faire
            une différence tangible dans votre communauté !
          </p>
        </div>

        <div className="mt-30 mb-20 flex flex-col items-center bg-emerald-100">
          <p className="text-3xl text-center font-bold mt-12 mb-6 max-w-4xl mx-auto">
            Les déchets en chiffres
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-8 mb-12 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center gap-3">
              <h3 className="text-lg font-semibold">Déchets collectés</h3>
              <p className="text-3xl font-bold text-emerald-800">20 tonnes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center gap-3">
              <h3 className="text-lg font-semibold">Points gagnés</h3>
              <p className="text-3xl font-bold text-emerald-800">1.000.0000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center gap-3">
              <h3 className="text-lg font-semibold">Associations aidées</h3>
              <p className="text-3xl font-bold text-emerald-800">15</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center gap-3">
              <h3 className="text-lg font-semibold">Bénévoles mobilisés</h3>
              <p className="text-3xl font-bold text-emerald-800">30</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center gap-3">
              <h3 className="text-lg font-semibold">Événements réalisés</h3>
              <p className="text-3xl font-bold text-emerald-800">10</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center gap-3">
              <h3 className="text-lg font-semibold">Français sensibilisés</h3>
              <p className="text-3xl font-bold text-emerald-800">65 %</p>
            </div>
          </div>
        </div>

        <PartnersGrid />
      </main>
    </>
  );
}
