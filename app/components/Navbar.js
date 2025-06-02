"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, signOut, getCurrentUser } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Vérifier si l'utilisateur est connecté au chargement du composant
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'utilisateur:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Écouter les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const { user } = await getCurrentUser();
          setUser(user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      // Nettoyer l'écouteur lors du démontage du composant
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Gérer la déconnexion
  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      setUser(null);
      setProfileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Obtenir le prénom de l'utilisateur pour l'affichage
  const getFirstName = () => {
    if (!user) return "";
    return (
      user.user_metadata?.first_name ||
      user.email?.split("@")[0] ||
      "Utilisateur"
    );
  };

  // Rendu côté client uniquement pour éviter les erreurs d'hydratation
  const [mounted, setMounted] = useState(false);

  // Ce useEffect s'exécute uniquement côté client après le premier rendu
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">New Life</Link>
      </div>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/TabacInfoPage" onClick={() => setMenuOpen(false)}>
              Infos tabac
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Rendu côté client uniquement pour éviter les erreurs d'hydratation */}
        {mounted ? (
          !loading ? (
            <div className="navbar-auth">
              {user ? (
                <div className="profile-container">
                  <button
                    className="profile-button"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  >
                    <span className="profile-name">{getFirstName()}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 512 512"
                    >
                      <g clipPath="url(#a)">
                        <path
                          fill="#fff"
                          d="M256 256a127.998 127.998 0 0 0 118.257-79.017 128.003 128.003 0 0 0-167.24-167.24A128.001 128.001 0 0 0 128 128a128.125 128.125 0 0 0 128 128Zm0-213.333a85.336 85.336 0 0 1 83.694 101.981 85.337 85.337 0 0 1-67.046 67.046A85.335 85.335 0 1 1 256 42.667Zm0 256a192.211 192.211 0 0 0-192 192 21.334 21.334 0 0 0 42.667 0 149.334 149.334 0 1 1 298.666 0 21.333 21.333 0 0 0 42.667 0 192.211 192.211 0 0 0-192-192Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M0 0h512v512H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                  {profileMenuOpen && (
                    <div className="profile-menu">
                      <Link
                        href="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Mon profil
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="sign-out-button"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="navbar-buttons">
                  <Link href="/login">Se connecter</Link>
                  <Link href="/register">S'inscrire</Link>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-buttons">
              <Link href="/login">Se connecter</Link>
              <Link href="/register">S'inscrire</Link>
            </div>
          )
        ) : (
          // Affichage par défaut pendant le chargement côté client
          <div className="navbar-buttons">
            <Link href="/login">Se connecter</Link>
            <Link href="/register">S'inscrire</Link>
          </div>
        )}
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`burger-bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`burger-bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`burger-bar ${menuOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
}

export default Navbar;
