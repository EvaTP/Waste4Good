"use client";
import React from "react";
import dynamic from "next/dynamic";

// Importer la carte Leaflet de manière dynamique :
// on charge LeafletMap uniquement côté client (ssr: false)
const MapNoSSR = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <p>Chargement de la carte...</p>
    </div>
  ),
});

export default function MapSection() {
  return (
    <section
      className="w-full py-16 px-4"
      style={{ backgroundColor: "#9cc638" }}
    >
      <div className="max-w-400 mx-auto">
        {/* Titre de la section */}
        <h2 className="text-5xl font-bold text-center text-white mb-4">
          Nos actions en France
        </h2>

        {/* Sous-titre */}
        <p className="text-xl text-center text-white/90 mb-12 max-w-3xl mx-auto">
          Découvrez où nos bénévoles agissent pour un environnement plus propre
        </p>

        {/* Container de la carte avec une hauteur fixe */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-125">
          <MapNoSSR />
        </div>

        {/* Légende */}
        <div className="mt-8 flex justify-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
            <span>Ville avec collectes actives</span>
          </div>
        </div>
      </div>
    </section>
  );
}
