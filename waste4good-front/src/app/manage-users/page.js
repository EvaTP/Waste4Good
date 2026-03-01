"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import layoutStyles from "../styles/layout.module.css";
import ItemVolunteer from "./components/itemVolunteer";
import NavBarMngt from "../general-components/NavBarMngt";
import { useState, useEffect } from "react";

export default function VolunteersMgt() {
  const [data, setData] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isLoading, setLoading] = useState(true);
  // AJOUTER UN BENEVOLE (formulaire modale)
  const [showModal, setShowModal] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  // MODIFIER UN BENEVOLE
  const [isEditing, setIsEditing] = useState(false);
  const [editVolunteerId, setEditVolunteerId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedfirstName = localStorage.getItem("firstName");
    if (storedfirstName) setfirstName(storedfirstName);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/volunteers`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${API}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Erreur lors du fetch des villes :", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  // On filtre les bénévoles selon la ville sélectionnée
  // const filteredVolunteers = selectedCity
  //   ? data.filter((volunteer) => volunteer.location === selectedCity)
  //   : data;

  // Filtrage par ville ET par nom/prénom
  const filteredVolunteers = data.filter((volunteer) => {
    const matchCity = selectedCity ? volunteer.location === selectedCity : true;
    const matchName = searchName
      ? `${volunteer.firstName} ${volunteer.lastname}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      : true;
    return matchCity && matchName;
  });

  // soumission du formulaire (modale) "ajouter un bénévole"
  const handleSubmitVolunteer = async (e) => {
    e.preventDefault();

    let volunteerData = { firstName, lastname, email, location };
    if (!isEditing) {
      volunteerData.password = password;
    } // ajoute password que si on n'est PAS en édition

    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `${API}/volunteers/${editVolunteerId}`
      : `${API}/volunteers`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volunteerData),
      });

      console.log("➡️ Requête:", method, url);
      console.log("💿 Données envoyées :", volunteerData);
      console.log("🙏 Statut réponse:", res.status);

      if (!res.ok) {
        throw new Error("Erreur lors de l'enregistrement du bénévole");
      }

      // Réinitialise les champs et masque la modale après soumission
      setfirstName("");
      setLastname("");
      setEmail("");
      setPassword("");
      setLocation("");
      setShowModal(false);
      setIsEditing(false);
      setEditVolunteerId(null);
      setSuccessMessage(
        isEditing
          ? "✅ Bénévole modifié avec succès."
          : "✅ Bénévole ajouté avec succès.",
      );

      // Re-fetch des bénévoles pour mettre à jour la liste
      const refreshed = await fetch(`${API}/volunteers`);
      setData(await refreshed.json());
    } catch (error) {
      console.error(error);
      alert("Impossible de sauvegarder le bénévole.");
    }
  };
  const handleEdit = (volunteer) => {
    setfirstName(volunteer.firstName);
    setLastname(volunteer.lastname);
    setEmail(volunteer.email);
    setPassword("");
    setLocation(volunteer.location);
    setEditVolunteerId(volunteer.id);
    setIsEditing(true);
    setShowModal(true);
  };

  // SUPPRIMER
  const handleDelete = async (volunteer) => {
    const confirmDelete = confirm(
      `Supprimer ${volunteer.firstName} ${volunteer.lastname} ?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/volunteers/${volunteer.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erreur serveur");

      // mise à jour locale
      setData((prev) => prev.filter((v) => v.id !== volunteer.id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="app_container">
      <NavBarMngt />

      {successMessage && (
        <div className={layoutStyles.success_message}>{successMessage}</div>
      )}
      <div className="mt-14">
        <h2 className={layoutStyles.card_header}>Bonjour {firstName} 👋 !</h2>
      </div>

      <main className={layoutStyles.main_content}>
        <div className={layoutStyles.card}>
          <div className={styles.volunteers_actions}>
            <button
              className={layoutStyles.submit_btn}
              onClick={() => setShowModal(true)}
            >
              <Image
                src="/user-plus.svg"
                alt="icon-addvolunteer"
                width={30}
                height={30}
                priority
              />
              Ajouter un.e bénévole
            </button>

            <div className={styles.search_filters}>
              {/* Recherche par nom */}
              <div className={styles.search_container}>
                <input
                  placeholder="Rechercher un.e bénévole"
                  className={styles.search_input}
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              {/* Filtre par ville */}
              <div className={styles.location_filter}>
                <select
                  className={styles.search_input}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Toutes les villes</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredVolunteers.map((volunteer) => (
              <ItemVolunteer
                key={volunteer.id}
                volunteer={volunteer}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </main>

      {/* MODALE : ajout / modification */}
      {showModal && (
        <div className={layoutStyles.modal_overlay}>
          <div className={layoutStyles.modal}>
            <h3>
              {isEditing ? "Modifier le bénévole" : "Ajouter un.e bénévole"}
            </h3>
            <form
              className={layoutStyles.form_container}
              onSubmit={handleSubmitVolunteer}
            >
              <div>
                <label className={layoutStyles.form_label}>Prénom</label>
                <input
                  required
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div>
                <label className={layoutStyles.form_label}>Nom</label>
                <input
                  required
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <label className={layoutStyles.form_label}>Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* le mot de passe est obligatoire en mode AJOUT mais pas en EDITION */}
              {!isEditing && (
                <div>
                  <label className={layoutStyles.form_label}>
                    Mot de passe
                  </label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className={layoutStyles.form_label}>Localisation</label>
                <input
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className={layoutStyles.modal_actions}>
                <button type="submit" className={layoutStyles.submit_btn}>
                  {isEditing ? "Modifier" : "Ajouter"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={layoutStyles.cancel_btn}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
