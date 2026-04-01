"use client";
import Image from "next/image";
import Link from "next/link";

// Textes et visuels pour chaque association (remplace les images par les tiennes)
const ASSOCIATIONS_CONTENT = [
  {
    name: "🌊 Ocean Cleanup",
    image: "/images/ocean_cleanup.png",
    tagline: "Nous nettoyons les océans pour protéger la vie marine.",
    description:
      "Chaque année, des millions de tonnes de plastiques envahissent nos mers et menacent les écosystèmes marins. Grâce à des technologies innovantes et à la mobilisation de bénévoles à travers le monde, nous interceptons les déchets avant qu'ils n'atteignent l'océan profond et menons des expéditions de nettoyage sur les côtes les plus touchées.",
  },
  {
    name: "🌲 Forest Guardians",
    image: "/images/forest_guardians.png",
    tagline:
      "Nous protégeons et replantons les forêts pour les générations futures.",
    description:
      "Les forêts abritent 80% de la biodiversité terrestre et jouent un rôle crucial dans la régulation du climat. Nous menons des programmes de reforestation dans les zones les plus dégradées et formons les communautés locales à la gestion durable des espaces boisés. Chaque arbre planté est un geste concret pour l'avenir de notre planète.",
  },
  {
    name: "🐯 Wildlife Protectors",
    image: "/images/wildlife_protectors.png",
    tagline: "Nous préservons les espèces menacées et leurs habitats naturels.",
    description:
      "Face à la sixième extinction de masse, nous agissons concrètement pour protéger les espèces les plus vulnérables. Nos équipes de terrain surveillent les populations animales, luttent contre le braconnage et restaurent les corridors écologiques indispensables à la survie de nombreuses espèces. Ensemble, nous refusons de laisser disparaître la biodiversité.",
  },
  {
    name: "💨 Clean Air Initiative",
    image: "/images/cleanair_initiative.png",
    tagline: "Nous luttons pour un air pur et des énergies propres pour tous.",
    description:
      "La pollution de l'air est responsable de millions de décès prématurés chaque année. Nous travaillons avec les collectivités, les industriels et les citoyens pour accélérer la transition vers des énergies renouvelables, réduire les émissions polluantes et sensibiliser le grand public aux bons gestes du quotidien qui font la différence pour notre santé et notre environnement.",
  },
  {
    name: "🌿 Urban Green Spaces",
    image: "/images/urban_greenspaces.png",
    tagline:
      "Nous reverdirons les villes pour améliorer la qualité de vie urbaine.",
    description:
      "Dans un monde de plus en plus urbanisé, les espaces verts sont essentiels au bien-être des habitants et à la biodiversité en ville. Nous accompagnons les municipalités dans la création de parcs, de jardins partagés et de toits végétalisés. Nos projets transforment des friches urbaines en véritables havres de nature accessibles à tous.",
  },
  {
    name: "♻️ Recycling Champions",
    image: "/images/recycling_champions.png",
    tagline:
      "Nous promouvons le recyclage et l'économie circulaire partout en France.",
    description:
      "Seulement 25% des déchets ménagers sont aujourd'hui correctement recyclés en France. Nous intervenons dans les écoles, les entreprises et les quartiers pour former aux bons gestes du tri, accompagner la mise en place de filières de recyclage locales et encourager le réemploi. Parce que le meilleur déchet est celui qu'on ne produit pas.",
  },
  {
    name: "💧 Water Conservation",
    image: "/images/water_conservation.png",
    tagline:
      "Nous préservons les ressources en eau pour les hommes et la nature.",
    description:
      "L'eau douce représente moins de 3% de l'eau sur Terre et sa disponibilité est menacée par le changement climatique et la pollution. Nous finançons des projets de dépollution des rivières et des nappes phréatiques, sensibilisons aux économies d'eau au quotidien et travaillons à la restauration des zones humides, véritables éponges naturelles indispensables à nos territoires.",
  },
  {
    name: "🌍 Global Sustainability",
    image: "/images/global_sustainability.png",
    tagline:
      "Nous construisons un modèle de développement durable à l'échelle mondiale.",
    description:
      "La durabilité ne peut pas s'arrêter aux frontières. Nous fédérons des acteurs de tous les continents autour d'objectifs communs : réduire notre empreinte carbone, promouvoir une consommation responsable et accompagner les pays en développement vers des modèles économiques respectueux de l'environnement. Ensemble, nous bâtissons le monde de demain.",
  },
];

export default function AssociationsPage() {
  return (
    <>
      {/* ── Banner ── */}
      <div className="relative w-full" style={{ height: "400px" }}>
        <Image
          src="/images/banner-page-asso.png"
          alt="Nos associations partenaires"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div
          className="absolute bottom-0 left-0 right-0 z-10 px-8 py-6"
          style={{ backgroundColor: "rgba(29, 110, 166, 0.85)" }}
        >
          <h1 className="text-white text-4xl font-bold text-center">
            Nos associations partenaires
          </h1>
        </div>
      </div>

      {/* ── Intro + bouton don ── */}
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl font-semibold text-gray-700 leading-relaxed">
            Grâce à vos collectes, vous accumulez des points que vous pouvez
            convertir en dons pour ces associations engagées dans la protection
            de notre planète.
          </p>
          <Link
            href="/donate"
            className="inline-block mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            💚 Convertir mes points en dons
          </Link>
        </div>
      </section>

      {/* ── Associations en alternance gauche/droite ── */}
      <section className="w-full bg-emerald-50 py-24 px-6">
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Elles agissent pour la planète
          </h2>
          <p className="text-center text-gray-500 mb-12 text-2xl">
            Découvrez les associations que vous pouvez, en tant que bénévole,
            soutenir avec vos points
          </p>
        </div>

        <div className="max-w-full mx-auto flex flex-col gap-24 px-56">
          {ASSOCIATIONS_CONTENT.map((asso, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 sm:px-12`}
            >
              {/* Image */}
              <div className="flex-1 flex justify-center">
                <Image
                  src={asso.image}
                  alt={asso.name}
                  width={400}
                  height={400}
                  className="rounded-xl shadow-lg w-full max-w-sm object-cover"
                />
              </div>

              {/* Texte */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {asso.name}
                </h3>
                <p className="text-2xl font-semibold text-emerald-700 mb-4">
                  {asso.tagline}
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {asso.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
