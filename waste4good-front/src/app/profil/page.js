"use client";
import Image from "next/image";
//import Link from "next/link";
//import styles from "./page.module.css";  pas de styles de page pour l'instant
import layoutStyles from "../styles/layout.module.css";
import { useState, useEffect } from "react";

//URL API Express = "http://localhost:3001/volunteers";

export default function Profil() {
  //const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // MODIFIER LE BENEVOLE
  const [volunteerId, setVolunteerId] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [cities, setCities] = useState([]);

  // useEffect(() => {
  //   // récupérer le bénévole connecté depuis localStorage
  //   // si pas connecté, redirection vers la page connexion
  //   const storedUser = localStorage.getItem("loggedInVolunteer");
  //   //   if(!storedUser){
  //   // 	window.location.href= "/connexion";
  //   // 	return;
  //   //   }
  //   if (storedUser) {
  //     const user = JSON.parse(storedUser);
  //     setVolunteerId(user.id);
  //     setFirstname(user.firstname);
  //     setLastname(user.lastname);
  //     setLocation(user.location);
  //   }

  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3001/volunteers");
  //       const data = await res.json();
  //       setData(data);
  //     } catch (error) {
  //       console.error("Erreur lors du fetch :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;

  // // fonction appelée au submit du formulaire
  // const handleVolunteerProfile = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       `https://${process.env.NEXT_PUBLIC_API_URL}/connexion/volunteers/${volunteerId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           firstname,
  //           lastname,
  //           location,
  //         }),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error("Erreur lors de la mise à jour du profil.");
  //     }

  //     alert("Profil mis à jour avec succès !");
  //   } catch (error) {
  //     console.error("Erreur :", error);
  //     alert("Une erreur est survenue.");
  //   }
  // };

  // // bouton de déconnexion (supprime le localstorage et redirige vers la page connexion)
  // const handleLogout = () => {
  //   localStorage.removeItem("connectedVolunteerId");
  //   window.location.href = "/connexion";
  // };

  useEffect(() => {
    // Récupérer les infos depuis localStorage
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    // Si pas connecté, rediriger vers connexion
    if (!userId) {
      window.location.href = "/connexion";
      return;
    }

    setVolunteerId(userId);

    // Séparer prénom et nom
    if (userName) {
      const [first, ...last] = userName.split(" ");
      setFirstname(first);
      setLastname(last.join(" "));
    }

    if (userEmail) {
      setEmail(userEmail);
    }

    // Récupérer les villes pour la liste déroulante
    const fetchData = async () => {
      try {
        // Récupérer les villes
        const citiesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cities`,
        );
        const citiesData = await citiesRes.json();
        setCities(citiesData);

        // Récupérer les infos complètes du bénévole
        const volunteerRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/volunteers/${userId}`,
        );
        const volunteerData = await volunteerRes.json();
        setLocation(volunteerData.location);
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mettre à jour le profil
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/volunteers/${volunteerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            location,
          }),
        },
      );

      if (response.ok) {
        // Mettre à jour le localStorage
        localStorage.setItem("userName", `${firstname} ${lastname}`);
        localStorage.setItem("userEmail", email);
        setMessage("✅ Profil mis à jour avec succès !");
      } else {
        setMessage("❌ Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("❌ Une erreur est survenue.");
    }
  };

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="app_container">
      <div className={layoutStyles.main_content}>
        <div className={layoutStyles.card}>
          <h2 className={layoutStyles.card_header}>Mon profil</h2>

          {/* <form
            className={layoutStyles.form_container}
            onSubmit={handleVolunteerProfile}
          >
            <div>
              <label className={layoutStyles.form_label}>Prénom</label>
              <input
                placeholder="Votre prénom"
                required
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label className={layoutStyles.form_label}>Nom</label>
              <input
                placeholder="Votre nom"
                required
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label className={layoutStyles.form_label}>Localisation</label>
              <input
                placeholder="Votre ville"
                required
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className={layoutStyles.profil_actions}>
              <button type="submit" className={layoutStyles.submit_btn}>
                <Image
                  src="/save.svg"
                  alt="icon-save"
                  width={30}
                  height={30}
                  priority
                />
                Mise à jour
              </button>
              
            </div>
          </form> */}

          <div className={layoutStyles.form_container}>
            {/* Prénom */}
            <div>
              <label className={layoutStyles.form_label}>Prénom</label>
              <input
                type="text"
                placeholder="Votre prénom"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Nom */}
            <div>
              <label className={layoutStyles.form_label}>Nom</label>
              <input
                type="text"
                placeholder="Votre nom"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className={layoutStyles.form_label}>Email</label>
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Ville (liste déroulante) */}
            <div>
              <label className={layoutStyles.form_label}>Ville</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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

            {/* Message de retour */}
            {message && (
              <div
                className={`p-3 rounded-lg ${
                  message.includes("✅")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            {/* Bouton de mise à jour */}
            <button
              onClick={handleUpdateProfile}
              className={layoutStyles.submit_btn}
            >
              <Image src="/save.svg" alt="icon-save" width={25} height={25} />
              Mettre à jour le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
