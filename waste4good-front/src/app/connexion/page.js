"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
// import layoutStyles from "../styles/layout.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    password: "",
  });

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fonction pour récupérer l'utilisateur en dur (Julien)
  // const fetchHardcodedUser = async () => {
  //   setLoading(true);
  //   setError('');
  //   setSuccess('');

  //   try {
  //     const res = await fetch("http://localhost:3001/connexion", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({}) // Corps vide car données en dur côté serveur
  //     });

  //     if (res.ok) {
  //       const userData = await res.json();
  //       setData(userData);
  //       setSuccess(<span className={layoutStyles.success_message}>Bonjour Julien ! 😃</span>);
  //       router.push('/dashboard');

  //     } else {
  //       const errorData = await res.json();
  //       setError(errorData.message || 'Erreur lors de la récupération');
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors du fetch :", error);
  //     setError('Erreur de connexion au serveur');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fonction pour gérer la connexion avec le formulaire
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://waste4good-back.vercel.app/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const userData = await res.json();
        setData(userData);
        localStorage.setItem("email", userData.email);
        setSuccess("✔︎ Connexion réussie !");

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Identifiants invalides");
      }
    } catch (error) {
      console.error("✗ Erreur lors de la connexion :", error);
      setError("✗ Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.app_container}>
      {/* <header className={styles.header}>
        <div className={styles.header_content}>
          <div className={styles.header_title}>
            <Image
              src="/log-in.svg"
              alt="Recycle"
              className={styles.logo}
              width={40}
              height={40}
            />
            Connexion
          </div>
        </div>
      </header> */}

      <main className={styles.main_content}>
        <div className={styles.card}>
          <div className={styles.card_header}>Connexion</div>

          {/* Bouton pour récupérer l'utilisateur en dur
          <div className={styles.test_section}>
            <button 
              type="button" 
              onClick={fetchHardcodedUser} 
              className={styles.test_btn}
              disabled={isLoading}
            >
              <Image src="/log-in.svg" alt="Connexion" className={styles.logo} width={20} height={20} />
              {isLoading ? 'Chargement...' : 'Récupérer utilisateur Julien'}
            </button>
          </div> */}

          {/* Formulaire de connexion */}
          <form onSubmit={handleLogin} className={styles.form_container}>
            <div>
              <label htmlFor="email" className={styles.form_label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Votre email"
                className={styles.form_input}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.form_label}>
                Mot de passe *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Votre mot de passe"
                className={styles.form_input}
                required
              />
            </div>
            <div>
              <p className="font-style: italic">* champs obligatoires</p>
            </div>

            <button
              type="submit"
              // onClick={fetchHardcodedUser}
              className={styles.submit_btn}
              disabled={isLoading}
            >
              <Image
                src="/log-in-white.svg"
                alt="Connexion"
                className={styles.logo}
                width={20}
                height={20}
              />
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Messages d'erreur et de succès */}
          {error && <div className={styles.error_message}>{error}</div>}

          {success && <div className={styles.success_message}>{success}</div>}
        </div>
      </main>
    </div>
  );
}
