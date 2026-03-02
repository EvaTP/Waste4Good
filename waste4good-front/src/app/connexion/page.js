"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
// import layoutStyles from "../styles/layout.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fonction pour gérer la connexion avec le formulaire
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connexion`, {
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

        // Stocker le token et les infos essentielles
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("userId", userData.user.id);
        sessionStorage.setItem("userRole", userData.user.role);
        // firstname et username pas indispensables mais servent à afficher un message de bienvenue personnalisé
        sessionStorage.setItem("firstName", userData.user.firstname);
        sessionStorage.setItem(
          "userName",
          `${userData.user.firstname} ${userData.user.lastname}`,
        );

        window.dispatchEvent(new Event("storage"));

        setSuccess("✔︎ Connexion réussie !");

        setTimeout(() => {
          if (userData.user.role === "admin") {
            router.push("/manage-users");
          } else {
            router.push("/dashboard");
          }
        }, 1500);
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
      <main className={styles.main_content}>
        <div className={styles.card}>
          <div className={styles.card_header}>Connexion</div>

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
