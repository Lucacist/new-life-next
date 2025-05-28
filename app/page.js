"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SmokingStatsChart from "./components/SmokingStatsChart";

export default function Home() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/hello");
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-content">
        <div className="home-page-title">
          <h1>Votre Voyage vers une Vie Sans Tabac</h1>
          <p>
            Une révolution dans votre parcours d'arrêt du tabac arrive bientôt
            sur vos smartphones. Notre application mobile innovante vous
            accompagnera pas à pas vers une vie plus saine, avec des
            fonctionnalités uniques
          </p>
          <div className="home-page-buttons">
            <Link href="/login">Se connecter</Link>
          </div>
        </div>
        <div className="home-page-image">
          <img src="/img/plante.svg" alt="Plante" />
        </div>
      </div>
      <div className="home-page-divider">
        <div className="content">
          <h2>Suivi Personnalisé</h2>
          <p>
            Suivez votre progression et visualisez vos accomplissements jour
            après jour.
          </p>
        </div>
        <div className="content">
          <h2>Calculateur d'Économies</h2>
          <p>
            Découvrez combien vous économisez en temps réel et planifiez vos
            futures récompenses.
          </p>
        </div>
        <div className="content">
          <h2>Conseils et Accompagnement</h2>
          <p>
            Accédez à des conseils personnalisés et des stratégies efficaces
            pour surmonter les envies.
          </p>
        </div>
      </div>
      <div className="home-page-divider2">
        <SmokingStatsChart />
        <div className="home-page-divider2-text">
          <h1>Le tabac frappe plus fort chez les hommes</h1>
          <p>Un écart criant, reflet de normes culturelles… mais les risques, eux, sont les mêmes pour tous.</p>
          <div className="home-page-buttons">
            <Link href="/about">Voir plus</Link>
          </div>
        </div>
      </div>
      <div className="home-page-divider3">
        <h1>Bientôt disponible sur :</h1>
        <div className="home-page-divider3-content">
          <img src="/img/app-store.png" alt="App Store" />
          <img src="/img/google-play.png" alt="Google Play" />
        </div>
      </div>
    </div>
  );
}
