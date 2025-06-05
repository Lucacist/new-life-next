"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "../../lib/supabase";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    // Vérification de la force du mot de passe
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(
        email,
        password,
        firstName,
        lastName
      );

      if (error) {
        throw error;
      }

      // Afficher un message de succès
      setSuccess(true);

      // Redirection après un délai
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setError(
        error.message || "Une erreur est survenue lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Inscription</h1>

        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div className="auth-success">
            Inscription réussie ! Veuillez vérifier votre email pour confirmer
            votre compte. Vous allez être redirigé vers la page de connexion...
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-container-row">
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Votre prénom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Votre adresse email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Créez un mot de passe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirmez votre mot de passe"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Vous avez déjà un compte ?{" "}
            <Link href="/login">Connectez-vous ici</Link>
          </p>
        </div>
      </div>
      <img className="auth-image" style={{ marginBottom: "5rem" }} src="/img/signin.svg" alt="Sign In" />
    </div>
  );
}
