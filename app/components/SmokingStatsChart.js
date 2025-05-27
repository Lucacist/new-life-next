'use client';

import { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SmokingStatsChart() {
  const [smokingData, setSmokingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  // Fonction pour désactiver les boutons du graphique après le rendu
  useEffect(() => {
    if (!chartRef.current || !smokingData) return;

    // Fonction pour supprimer tous les boutons et contrôles
    const removeAllChartControls = () => {
      // Cibler tous les éléments potentiels qui pourraient être des boutons
      const selectors = [
        '.chartjs-button-container',
        '.chartjs-button',
        '.chartjs-toolbar',
        '.chartjs-menu-container',
        '.chartjs-menu',
        '.chartjs-menu-item',
        '.chartjs-tooltip-key',
        '.chartjs-legend-item',
        // Cibler spécifiquement les boutons noirs en haut à gauche
        'canvas + div',
        'canvas ~ div',
        'div > button',
        '.chart-wrapper > div:not(.chart-caption)',
        '.chart-wrapper > div > button',
        '.chart-wrapper > div > div',
      ];

      // Rechercher tous les éléments correspondant aux sélecteurs
      selectors.forEach(selector => {
        const elements = chartRef.current.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        });
      });

      // Rechercher également dans le document entier
      const globalElements = document.querySelectorAll('.chartjs-button, .chartjs-toolbar');
      globalElements.forEach(el => {
        el.style.display = 'none';
      });
    };
    
    // Exécuter la fonction plusieurs fois pour s'assurer qu'elle attrape les boutons
    // même s'ils sont ajoutés dynamiquement après le rendu initial
    const timer1 = setTimeout(removeAllChartControls, 100);
    const timer2 = setTimeout(removeAllChartControls, 500);
    const timer3 = setTimeout(removeAllChartControls, 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [smokingData, chartRef]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Utiliser le fichier JSON statique au lieu de l'API
        const response = await fetch('/data/smoking-stats.json');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setSmokingData(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="loading">Chargement des statistiques...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!smokingData) return <div>Aucune donnée disponible</div>;

  // Données pour le graphique global
  const globalChartData = {
    labels: ['Hommes', 'Femmes'],
    datasets: [
      {
        // Supprimer le label pour éliminer la légende
        label: '',
        data: [smokingData.global.men, smokingData.global.women],
        backgroundColor: ['#000', '#dbd373'], // Noir et jaune pour correspondre à votre thème
        borderColor: ['#000', '#dbd373'],
        borderWidth: 0,
        borderRadius: 6,
        barThickness: 60,
      },
    ],
  };

  // Options pour le graphique global
  const globalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // Configuration pour supprimer le bouton mais garder les interactions
    plugins: {
      // Configuration pour les infobulles
      tooltip: {
        enabled: true,
        titleFont: {
          family: 'EsRebond',
          size: 14,
        },
        bodyFont: {
          family: 'EsRebond',
          size: 13,
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
      },
      // Désactiver complètement la légende pour supprimer le bouton
      legend: {
        display: false,
      },
      title: {
        display: true,
        font: {
          family: 'EsRebond',
          size: 20,
          weight: 'bold',
        },
        color: '#000',
        padding: {
          top: 10,
          bottom: 30
        },
      },
      tooltip: {
        titleFont: {
          family: 'EsRebond',
          size: 14,
        },
        bodyFont: {
          family: 'EsRebond',
          size: 13,
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: 'EsRebond',
            size: 12,
          },
          color: '#000',
          padding: 10,
        },
        title: {
          display: true,
          text: 'Pourcentage (%)',
          font: {
            family: 'EsRebond',
            size: 14,
            weight: 'medium',
          },
          color: '#000',
          padding: {
            bottom: 10,
            top: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: 'EsRebond',
            size: 14,
            weight: 'medium',
          },
          color: '#000',
          padding: 10,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="smoking-stats-container">
      <div className="chart-wrapper" ref={chartRef}>
        <Bar data={globalChartData} options={globalChartOptions} />
      </div>
      <p className="chart-caption">Données basées sur les statistiques de l'OMS, 2020</p>
    </div>
  );
}
