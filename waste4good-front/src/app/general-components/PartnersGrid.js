"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function PartnersGrid() {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssociations() {
      try {
        const response = await fetch(
          "https://waste4good-back.vercel.app/associations",
        );
        const data = await response.json();
        setAssociations(data.slice(0, 8)); // on limite à 8 partenaires
      } catch (error) {
        console.error("Erreur chargement partenaires :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAssociations();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Chargement des partenaires…</p>;
  }

  return (
    <section className="mt-32 mb-24 bg-green-800 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl font-semibold text-center mb-12">
          Nos partenaires
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {associations.map((association) => (
            <div
              key={association.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              {association.imageUrl && (
                <Image
                  src={association.imageUrl}
                  alt={association.name}
                  width={160}
                  height={100}
                  className="object-contain mb-4"
                />
              )}

              <h3 className="text-lg font-semibold">{association.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
