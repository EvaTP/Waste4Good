"use client"; // Obligatoire pour utiliser Leaflet dans Next.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- FIX : Problème d'icônes Leaflet avec Webpack/Next.js ---
// Par défaut, Next.js ne trouve pas les images des marqueurs. On les redéfinit ici.
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LeafletMap() {
  const centerFrance = [46.603354, 1.888334];

  return (
    <MapContainer
      center={centerFrance}
      zoom={5}
      style={{ height: "100%", width: "100%" }} // Important : prend toute la place du parent
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[48.8566, 2.3522]} icon={customIcon}>
        <Popup>Collecte active à Paris !</Popup>
      </Marker>
    </MapContainer>
  );
}
