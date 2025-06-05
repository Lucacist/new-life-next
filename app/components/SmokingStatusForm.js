"use client";

import { useState, useEffect } from "react";

function SmokingStatusForm({ initialData, onSubmit }) {
  const [hasQuit, setHasQuit] = useState(false);
  const [quitDate, setQuitDate] = useState("");
  const [daysSinceQuit, setDaysSinceQuit] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Initialiser le formulaire avec les données existantes
  useEffect(() => {
    if (initialData) {
      setHasQuit(initialData.has_quit || false);
      setQuitDate(initialData.quit_date || "");
      
      // Calculer le nombre de jours depuis l'arrêt
      if (initialData.has_quit && initialData.quit_date) {
        const quitDateObj = new Date(initialData.quit_date);
        const today = new Date();
        const diffTime = Math.abs(today - quitDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysSinceQuit(diffDays);
      }
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    
    try {
      const formData = {
        has_quit: hasQuit,
        quit_date: hasQuit ? quitDate : null
      };
      
      const result = await onSubmit(formData);
      
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Statut mis à jour avec succès!" });
        
        // Recalculer le nombre de jours depuis l'arrêt
        if (hasQuit && quitDate) {
          const quitDateObj = new Date(quitDate);
          const today = new Date();
          const diffTime = Math.abs(today - quitDateObj);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysSinceQuit(diffDays);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setMessage({ type: "error", text: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="smoking-status-form-container">
      {hasQuit && quitDate && (
        <div className="quit-stats">
          <h3>Félicitations! 🎉</h3>
          <p className="days-counter">{daysSinceQuit} jour{daysSinceQuit > 1 ? 's' : ''} sans tabac</p>
          <p>Vous avez arrêté de fumer le {new Date(quitDate).toLocaleDateString()}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="smoking-status-form">
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={hasQuit}
              onChange={(e) => setHasQuit(e.target.checked)}
            />
            J'ai arrêté de fumer
          </label>
        </div>
        
        {hasQuit && (
          <div className="form-group">
            <label htmlFor="quit-date">Date d'arrêt:</label>
            <input
              type="date"
              id="quit-date"
              value={quitDate}
              onChange={(e) => setQuitDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required={hasQuit}
            />
          </div>
        )}
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

export default SmokingStatusForm;
