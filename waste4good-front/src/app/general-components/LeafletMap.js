"use client"; // Obligatoire pour utiliser Leaflet dans Next.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// --- FIX : Problème d'icônes Leaflet avec Webpack/Next.js ---
// Par défaut, Next.js ne trouve pas les images des marqueurs. On les redéfinit ici.
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

export default function LeafletMap() {
  const centerFrance = [46.603354, 1.888334];
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        // récupérer les villes
        const citiesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cities`,
        );
        const cities = await citiesRes.json();

        // récupérer les bénévoles
        const volunteersRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/volunteers`,
        );
        const volunteers = await volunteersRes.json();

        // compter les bénévoles par ville
        const citiesWithVolunteers = cities.map((city) => {
          const volunteerCount = volunteers.filter(
            (v) => v.location === city.id,
          ).length;

          return {
            id: city.id,
            name: city.name,
            lat: parseFloat(city.coordinates_lat),
            lng: parseFloat(city.coordinates_lng),
            volunteerCount,
          };
        });

        setCitiesData(citiesWithVolunteers);
      } catch (error) {
        console.error("Erreur lors du chargement des données", error);
      }
    };
    fetchCitiesData();
  }, []);

  return (
    <MapContainer
      center={centerFrance}
      zoom={6}
      style={{ height: "100%", width: "100%" }} // Important : prend toute la place du parent
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* afficher un marker pour chaque ville */}
      {citiesData.map((city) => (
        <Marker key={city.id} position={[city.lat, city.lng]} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg">{city.name}</h3>
              <p className="text-emerald-600 font-semibold">
                {city.volunteerCount} bénévole
                {city.volunteerCount > 1 ? "s" : ""}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      {/* <Marker position={[48.8566, 2.3522]} icon={customIcon}>
        <Popup>Collecte active à Paris !</Popup>
      </Marker> */}
    </MapContainer>
  );
}
