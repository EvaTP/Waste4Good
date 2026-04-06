import Image from "next/image";

export default function NewsletterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <>
        {/* Banner avec H1 + CTA superposés */}
        <div className="relative w-full h-100">
          <Image
            src="/images/banner-page-newsletter.png"
            alt="Banner Waste4Good"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/30 z-0" />

          {/* Overlay avec texte */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center">
            <h1 className="text-white text-6xl font-bold">Newsletter</h1>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col items-center p-8 gap-4 text-center mt-12">
          <h1 className="text-2xl font-semibold">Newsletter 🌱</h1>
          <p className="text-lg mt-12 mb-4 max-w-xl">
            Inscrivez-vous pour recevoir nos actualités, événements et astuces
            écoresponsables.
          </p>
          <input
            type="email"
            placeholder="Votre email"
            className="border border-gray-300 rounded p-2 w-68 sm:w-80 md:w-96 mx-auto"
          />
          <button className="bg-emerald-600 text-white font-semibold py-2 px-6 mt-2 hover:bg-emerald-700 transition-colors">
            S'inscrire
          </button>
        </div>
      </>
    </div>
  );
}
