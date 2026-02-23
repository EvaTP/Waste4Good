"use client";
import { useState, useEffect } from "react";

export default function CollectionForm({ onSuccess }) {
  const [cities, setCities] = useState([]);
  const [wastes, setWastes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [quantities, setQuantities] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cities`,
        );
        const citiesData = await citiesRes.json();
        setCities(citiesData);

        const wastesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/wastes`,
        );
        const wastesData = await wastesRes.json();
        setWastes(wastesData);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchData();
  }, []);

  const handleQuantityChange = (wasteId, value) => {
    setQuantities({
      ...quantities,
      [wasteId]: parseInt(value) || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const volunteerId = localStorage.getItem("userId");

    if (!volunteerId) {
      setMessage("Erreur : utilisateur non connecté");
      setIsSubmitting(false);
      return;
    }

    if (!selectedCity) {
      setMessage("Veuillez sélectionner une ville");
      setIsSubmitting(false);
      return;
    }

    const waste_items = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([wasteId, quantity]) => ({
        waste_id: parseInt(wasteId),
        quantity: quantity,
      }));

    if (waste_items.length === 0) {
      setMessage("Veuillez saisir au moins un déchet collecté");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/collections`,
        // "https://waste4good-back.vercel.app/collections",
        // "http://localhost:3001/collections",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            volunteer_id: parseInt(volunteerId),
            city_id: parseInt(selectedCity),
            waste_items: waste_items,
          }),
        },
      );

      if (response.ok) {
        setMessage("✅ Collecte enregistrée avec succès !");
        setSelectedCity("");
        setQuantities({});

        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(`❌ Erreur : ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("❌ Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h3 className="text-2xl font-semibold mb-4">Enregistrer une collecte</h3>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Ville de collecte *</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">-- Sélectionnez une ville --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Déchets collectés</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wastes.map((waste) => (
              <div key={waste.id} className="flex items-center gap-3">
                <label className="flex-1 font-medium">
                  {waste.value === "cigarette" && "🚬 Mégots"}
                  {waste.value === "plastic" && "🥤 Plastique"}
                  {waste.value === "glass" && "🍶 Verre"}
                  {waste.value === "metal" && "🥫 Métal"}
                  {waste.value === "textile" && "👕 Textile"}
                  {waste.value === "electronic" && "📱 Électronique"}
                  {waste.value === "other" && "❓ Autre"}
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={quantities[waste.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(waste.id, e.target.value)
                  }
                  className="w-24 p-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg"
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer la collecte"}
        </button>
      </div>
    </div>
  );
}
