import Image from "next/image";
import PartnersGrid from "@/app/general-components/PartnersGrid";

export default function Home() {
  return (
    <>
      {/* Banner avec H1 + CTA superposés */}
      <div className="relative w-full h-100">
        <Image
          src="/images/banner-page-asso.png"
          alt="Banner Waste4Good"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Overlay avec texte */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-white text-6xl font-bold">Nous connaître</h1>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 transition-colors duration-300">
            Nous rejoindre
          </button>
        </div>
      </div>

      {/* Contenu de page */}
      <main className="min-h-dvh py-12">
        <h2 className="text-6xl font-bold text-center mt-8 mb-10 leading-20">
          NOS MISSIONS :
          <br />
          ANALYSER, SENSIBILISER, MOBILISER
        </h2>

        <section className="w-full bg-emerald-50 py-24">
          <div className="mb-20">
            <p className="w-full text-3xl font-bold text-center px-2 py-3">
              Depuis plus de 30 ans, Waste4Good œuvre pour notre environnement.
              <br />
              Notre mission ? Sensibiliser le plus grand nombre et inspirer une
              mobilisation collective contre les déchets abandonnés.
            </p>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-22 md:gap-24 sm:px-12">
            {/* Bloc ANALYSER */}
            <div className="flex-1 flex flex-col items-center">
              <Image
                src="/images/asso-analyser.png"
                alt="Analyser"
                width={400}
                height={400}
                className="rounded-xl shadow-lg mb-6 w-full max-w-sm"
              />
              <p className="text-2xl md:text-3xl font-semibold max-w-md">
                Nous analysons la répartition des déchets pour mieux cibler nos
                actions.
              </p>
              <br />
              <p className="text-2xl max-w-4xl mx-auto mt-3.5">
                Nous suivons de près l’évolution des déchets abandonnés en
                France grâce à des baromètres. Ces outils nous permettent
                d’évaluer à la fois l’ampleur du phénomène et la perception
                qu’en ont les citoyens, afin d’orienter nos actions de
                sensibilisation. Nous menons aussi des études afin d'analyser
                les freins, les leviers, les idées reçues.
              </p>
            </div>

            {/* Bloc SENSIBILISER */}
            <div className="flex-1 flex flex-col items-center">
              <Image
                src="/images/asso-sensibiliser.png"
                alt="Sensibiliser"
                width={400}
                height={400}
                className="rounded-xl shadow-lg mb-6 w-full max-w-sm"
              />
              <p className="text-2xl md:text-3xl font-semibold max-w-md">
                Nous sensibilisons le grand public sur les gestes écologiques à
                adopter.
              </p>
              <br />
              <p className="text-2xl max-w-4xl mx-auto mt-3.5">
                À travers nos campagnes nationales de communication, nos
                programmes et nos outils pédagogiques, nous cherchons à
                sensibiliser le plus grand nombre sur les impacts des déchets
                abandonnés sur l’environnement et la nécessité d’adopter les
                gestes propres.
              </p>
            </div>

            {/* Bloc MOBILISER */}
            <div className="flex-1 flex flex-col items-center">
              <Image
                src="/images/asso-mobiliser.png"
                alt="Mobiliser"
                width={400}
                height={400}
                className="rounded-xl shadow-lg mb-6 w-full max-w-sm"
              />
              <p className="text-2xl md:text-3xl font-semibold max-w-md">
                Nous mobilisons acteurs et citoyens pour des actions sur le
                terrain.
              </p>
              <br />
              <p className="text-2xl max-w-4xl mx-auto mt-3.5">
                Nous sommes convaincus que nous devons agir collectivement et
                mobiliser différents acteurs dans une dynamique de
                co-construction : gestionnaires d’espaces naturels,
                éco-organismes, collectivités, entreprises, associations d’élus
                et associations environnementales et citoyens.
                <br />
                Rejoignez-nous dans cette aventure écologique et contribuez à
                faire une différence tangible dans votre communauté !
              </p>
            </div>
          </div>
        </section>

        {/* Bloc LES DECHETS EN CHIFFRES */}
        {/* <div className="mt-30 mb-20 flex flex-col items-center bg-emerald-100">
          <p className="text-3xl text-center font-bold mt-12 mb-6 max-w-4xl mx-auto">
            Les déchets en chiffres
          </p>
        </div> */}
        {/* SECTION LES DECHETS EN CHIFFRES */}
        <section className="mt-30 mb-20 bg-emerald-800 text-white">
          <div className="py-20 px-6">
            <h2 className="text-4xl font-bold text-center mb-16">
              Les déchets en chiffres
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Mégots */}
              <div className="bg-emerald-700 p-12 border border-emerald-600 hover:bg-emerald-600 transition">
                <Image
                  src="/waste-cigarette.svg"
                  alt="Mégots"
                  width={50}
                  height={50}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">
                  Mégots de cigarette
                </h3>
                <p className="text-5xl font-bold mb-4">23 milliards</p>
                <p className="opacity-80">Jetés chaque année dans la nature.</p>
              </div>

              {/* Plastique */}
              <div className="bg-emerald-700 p-12 border border-emerald-600 hover:bg-emerald-600 transition">
                <Image
                  src="/waste-plastic-package.svg"
                  alt="Plastique"
                  width={50}
                  height={50}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">Plastique</h3>
                <p className="text-5xl font-bold mb-4">4,5 millions</p>
                <p className="opacity-80">Tonnes produites chaque année.</p>
              </div>

              {/* Verre */}
              <div className="bg-emerald-700 p-12 border border-emerald-600 hover:bg-emerald-600 transition">
                <Image
                  src="/waste-glass-wine.svg"
                  alt="Verre"
                  width={50}
                  height={50}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">Verre</h3>
                <p className="text-5xl font-bold mb-4">2 millions</p>
                <p className="opacity-80">Tonnes recyclées par an.</p>
              </div>

              {/* Electronique */}
              <div className="bg-emerald-700 p-12 border border-emerald-600 hover:bg-emerald-600 transition">
                <Image
                  src="/waste-smartphone.svg"
                  alt="Smartphone"
                  width={50}
                  height={50}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">Électronique</h3>
                <p className="text-5xl font-bold mb-4">1,7 million</p>
                <p className="opacity-80">Tonnes collectées chaque année.</p>
              </div>

              {/* Métal */}
              <div className="bg-emerald-700 p-12 border border-emerald-600 hover:bg-emerald-600 transition">
                <Image
                  src="/waste-metal-trash.svg"
                  alt="Métal"
                  width={50}
                  height={50}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">Métal</h3>
                <p className="text-5xl font-bold mb-4">800 000</p>
                <p className="opacity-80">Tonnes recyclées annuellement.</p>
              </div>

              {/* Textile */}
              <div className="bg-emerald-700 p-12 border border-emerald-600 hover:bg-emerald-600 transition">
                <Image
                  src="/waste-shirt.svg"
                  alt="Textile"
                  width={50}
                  height={50}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-2xl font-semibold mb-2">Textile</h3>
                <p className="text-5xl font-bold mb-4">600 000</p>
                <p className="opacity-80">Tonnes jetées chaque année.</p>
              </div>
            </div>
          </div>
        </section>

        <PartnersGrid />
      </main>
    </>
  );
}
