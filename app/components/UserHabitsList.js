"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

function UserHabitsList({ habits }) {
  const [expandedHabit, setExpandedHabit] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Fonction pour mettre fin à une habitude
  const endHabit = async (habitId) => {
    if (!confirm("Voulez-vous vraiment marquer cette habitude comme terminée?")) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('user_tobacco_habits')
        .update({
          is_current_habit: false,
          end_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', habitId);
        
      if (error) throw error;
      
      // Recharger la page pour voir les changements
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'habitude:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour afficher les détails spécifiques au type de tabac
  const renderTypeSpecificDetails = (habit) => {
    if (!habit.details) return null;
    
    const details = habit.details;
    const typeId = habit.tobacco_type_id;
    
    switch (typeId) {
      case 1: // Cigarettes classiques
        return (
          <>
            <p><strong>Cigarettes par paquet:</strong> {details.package_size}</p>
            <p><strong>Prix du paquet:</strong> {details.package_price}€</p>
            <p><strong>Fréquence d'achat:</strong> {details.purchase_frequency_days} jour(s)</p>
            <p><strong>Coût mensuel estimé:</strong> {((details.package_price / details.package_size) * habit.quantity_per_day * 30).toFixed(2)}€</p>
          </>
        );
        
      case 2: // Cigarettes roulées
      case 3: // Pots de tabac
        return (
          <>
            <p><strong>Poids du pot:</strong> {details.pot_weight_grams}g</p>
            <p><strong>Prix du pot:</strong> {details.pot_price}€</p>
            <p><strong>Marque de feuilles:</strong> {details.rolling_papers_brand || "Non spécifié"}</p>
            <p><strong>Utilisation de filtres:</strong> {details.filters_used ? "Oui" : "Non"}</p>
            <p><strong>Fréquence d'achat:</strong> {details.purchase_frequency_days} jour(s)</p>
            <p><strong>Coût mensuel estimé:</strong> {(details.pot_price / details.purchase_frequency_days * 30).toFixed(2)}€</p>
          </>
        );
        
      case 4: // Cigarettes électroniques
        return (
          <>
            <p><strong>Appareil:</strong> {details.device_brand || "Non spécifié"}</p>
            <p><strong>Capacité du flacon:</strong> {details.liquid_bottle_capacity_ml}ml</p>
            <p><strong>Taux de nicotine:</strong> {details.nicotine_strength_mg_ml}mg/ml</p>
            <p><strong>Prix du flacon:</strong> {details.liquid_bottle_price}€</p>
            <p><strong>Fréquence d'achat de liquide:</strong> {details.liquid_purchase_frequency_days} jour(s)</p>
            <p><strong>Fréquence de remplacement des résistances:</strong> {details.coil_replacement_frequency_days || "Non spécifié"} jour(s)</p>
            <p><strong>Coût mensuel estimé:</strong> {(details.liquid_bottle_price / details.liquid_purchase_frequency_days * 30).toFixed(2)}€</p>
          </>
        );
        
      case 5: // Tabac à chiquer
      case 6: // Tabac à priser
        return (
          <>
            <p><strong>Poids du conditionnement:</strong> {details.package_weight_grams}g</p>
            <p><strong>Prix du conditionnement:</strong> {details.package_price}€</p>
            <p><strong>Fréquence d'achat:</strong> {details.purchase_frequency_days} jour(s)</p>
            <p><strong>Coût mensuel estimé:</strong> {(details.package_price / details.purchase_frequency_days * 30).toFixed(2)}€</p>
          </>
        );
        
      case 7: // Cigares / Cigarillos
        return (
          <>
            <p><strong>Nombre par boîte:</strong> {details.package_size}</p>
            <p><strong>Prix de la boîte:</strong> {details.package_price}€</p>
            <p><strong>Fréquence d'achat:</strong> {details.purchase_frequency_days} jour(s)</p>
            <p><strong>Coût mensuel estimé:</strong> {((details.package_price / details.package_size) * habit.quantity_per_day * 30).toFixed(2)}€</p>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="user-habits-list">
      {habits.map((habit) => (
        <div 
          key={habit.id} 
          className={`habit-card ${!habit.is_current_habit ? 'past-habit' : ''}`}
          onClick={() => setExpandedHabit(expandedHabit === habit.id ? null : habit.id)}
        >
          <div className="habit-header">
            <div className="habit-title">
              <h3>{habit.tobacco_types?.name || "Type inconnu"}</h3>
              <span className="habit-brand">{habit.brand}</span>
            </div>
            <div className="habit-status">
              {habit.is_current_habit ? (
                <span className="current-habit-badge">Actuelle</span>
              ) : (
                <span className="past-habit-badge">Ancienne</span>
              )}
            </div>
          </div>
          
          <div className="habit-summary">
            <p><strong>Consommation:</strong> {habit.quantity_per_day} {habit.unit_of_quantity}/jour</p>
            <p><strong>Depuis:</strong> {formatDate(habit.start_date)}</p>
            {!habit.is_current_habit && habit.end_date && (
              <p><strong>Jusqu'au:</strong> {formatDate(habit.end_date)}</p>
            )}
          </div>
          
          {expandedHabit === habit.id && (
            <div className="habit-details">
              <hr />
              {renderTypeSpecificDetails(habit)}
              
              {habit.is_current_habit && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    endHabit(habit.id);
                  }}
                  className="end-habit-button"
                  disabled={loading}
                >
                  {loading ? "Traitement..." : "J'ai arrêté cette habitude"}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserHabitsList;
