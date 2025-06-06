"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

function TobaccoHabitForm({ tobaccoTypes, onSubmit, initialData = null }) {
  const [selectedType, setSelectedType] = useState("");
  const [brand, setBrand] = useState("");
  const [quantityPerDay, setQuantityPerDay] = useState("");
  const [unitOfQuantity, setUnitOfQuantity] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Champs spécifiques au type de tabac
  const [details, setDetails] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Listes de marques par type de tabac
  const [brandsList, setBrandsList] = useState({
    cigarettes: [],
    rolling: [],
    cigars: [],
    pipe: [],
    chewing: []
  });

  // Initialiser le formulaire avec les données existantes si disponibles
  useEffect(() => {
    if (initialData) {
      setSelectedType(initialData.tobacco_type_id.toString());
      setBrand(initialData.brand || "");
      setQuantityPerDay(initialData.quantity_per_day || "");
      setUnitOfQuantity(initialData.unit_of_quantity || "");
      setStartDate(initialData.start_date || new Date().toISOString().split('T')[0]);
      setDetails(initialData.details || {});
    }
  }, [initialData]);

  // Charger les marques de tabac depuis Supabase
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // Cigarettes classiques
        const { data: cigarettesData } = await supabase
          .from('tobacco_brands_cigarettes')
          .select('name')
          .order('name');

        // Tabac à rouler
        const { data: rollingData } = await supabase
          .from('tobacco_brands_rolling')
          .select('name')
          .order('name');

        // Cigares
        const { data: cigarsData } = await supabase
          .from('tobacco_brands_cigars')
          .select('name')
          .order('name');

        // Tabac à pipe
        const { data: pipeData } = await supabase
          .from('tobacco_brands_pipe')
          .select('name')
          .order('name');

        // Tabac à chiquer
        const { data: chewingData } = await supabase
          .from('tobacco_brands_chewing')
          .select('name')
          .order('name');

        setBrandsList({
          cigarettes: cigarettesData || [],
          rolling: rollingData || [],
          cigars: cigarsData || [],
          pipe: pipeData || [],
          chewing: chewingData || []
        });
      } catch (error) {
        console.error("Erreur lors du chargement des marques:", error);
      }
    };

    fetchBrands();
  }, []);

  // Définir les unités de quantité en fonction du type de tabac sélectionné
  const getUnitOptions = () => {
    const typeId = parseInt(selectedType);
    
    if (!typeId) return [];
    
    switch (typeId) {
      case 1: // Cigarettes classiques
        return ["cigarettes"];
      case 2: // Cigarettes roulées
        return ["cigarettes", "grammes"];
      case 3: // Pots de tabac
        return ["grammes"];
      case 4: // Cigarettes électroniques
        return ["ml", "bouffées"];
      case 5: // Tabac à chiquer
        return ["portions"];
      case 6: // Tabac à priser
        return ["prises"];
      case 7: // Cigares / Cigarillos
        return ["cigares", "cigarillos"];
      default:
        return [];
    }
  };

  // Générer les champs de formulaire spécifiques au type de tabac
  const renderTypeSpecificFields = () => {
    const typeId = parseInt(selectedType);
    
    if (!typeId) return null;
    
    switch (typeId) {
      case 1: // Cigarettes classiques
        return (
          <>
            <div className="form-group">
              <label htmlFor="package-size">Nombre de cigarettes par paquet:</label>
              <input
                type="number"
                id="package-size"
                min="1"
                value={details.package_size || ""}
                onChange={(e) => setDetails({...details, package_size: parseInt(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="package-price">Prix du paquet (€):</label>
              <input
                type="number"
                id="package-price"
                min="0"
                step="0.01"
                value={details.package_price || ""}
                onChange={(e) => setDetails({...details, package_price: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
          </>
        );
        
      case 2: // Cigarettes roulées
      case 3: // Pots de tabac
        return (
          <>
            <div className="form-group">
              <label htmlFor="pot-weight">Poids du pot (grammes):</label>
              <input
                type="number"
                id="pot-weight"
                min="1"
                value={details.pot_weight_grams || ""}
                onChange={(e) => setDetails({...details, pot_weight_grams: parseInt(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pot-price">Prix du pot (€):</label>
              <input
                type="number"
                id="pot-price"
                min="0"
                step="0.01"
                value={details.pot_price || ""}
                onChange={(e) => setDetails({...details, pot_price: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rolling-papers">Marque de feuilles à rouler:</label>
              <input
                type="text"
                id="rolling-papers"
                value={details.rolling_papers_brand || ""}
                onChange={(e) => setDetails({...details, rolling_papers_brand: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={details.filters_used || false}
                  onChange={(e) => setDetails({...details, filters_used: e.target.checked})}
                />
                J'utilise des filtres
              </label>
            </div>
          </>
        );
        
      case 4: // Cigarettes électroniques
        return (
          <>
            <div className="form-group">
              <label htmlFor="device-brand">Marque de l'appareil:</label>
              <input
                type="text"
                id="device-brand"
                value={details.device_brand || ""}
                onChange={(e) => setDetails({...details, device_brand: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bottle-capacity">Capacité du flacon (ml):</label>
              <input
                type="number"
                id="bottle-capacity"
                min="1"
                step="0.1"
                value={details.liquid_bottle_capacity_ml || ""}
                onChange={(e) => setDetails({...details, liquid_bottle_capacity_ml: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nicotine-strength">Taux de nicotine (mg/ml):</label>
              <input
                type="number"
                id="nicotine-strength"
                min="0"
                step="0.1"
                value={details.nicotine_strength_mg_ml || ""}
                onChange={(e) => setDetails({...details, nicotine_strength_mg_ml: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bottle-price">Prix du flacon (€):</label>
              <input
                type="number"
                id="bottle-price"
                min="0"
                step="0.01"
                value={details.liquid_bottle_price || ""}
                onChange={(e) => setDetails({...details, liquid_bottle_price: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="liquid-purchase-frequency">Fréquence d'achat de liquide (mois):</label>
              <input
                type="number"
                id="liquid-purchase-frequency"
                min="0.5"
                step="0.5"
                value={details.liquid_purchase_frequency_months || ""}
                onChange={(e) => setDetails({...details, liquid_purchase_frequency_months: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="coil-replacement">Fréquence de remplacement des résistances (mois):</label>
              <input
                type="number"
                id="coil-replacement"
                min="0.5"
                step="0.5"
                value={details.coil_replacement_frequency_months || ""}
                onChange={(e) => setDetails({...details, coil_replacement_frequency_months: parseFloat(e.target.value) || ""})}
              />
            </div>
          </>
        );
        
      case 5: // Tabac à chiquer
      case 6: // Tabac à priser
        return (
          <>
            <div className="form-group">
              <label htmlFor="package-weight">Poids du conditionnement (grammes):</label>
              <input
                type="number"
                id="package-weight"
                min="1"
                value={details.package_weight_grams || ""}
                onChange={(e) => setDetails({...details, package_weight_grams: parseInt(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="package-price">Prix du conditionnement (€):</label>
              <input
                type="number"
                id="package-price"
                min="0"
                step="0.01"
                value={details.package_price || ""}
                onChange={(e) => setDetails({...details, package_price: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
          </>
        );
        
      case 7: // Cigares / Cigarillos
        return (
          <>
            <div className="form-group">
              <label htmlFor="package-size">Nombre par boîte:</label>
              <input
                type="number"
                id="package-size"
                min="1"
                value={details.package_size || ""}
                onChange={(e) => setDetails({...details, package_size: parseInt(e.target.value) || ""})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="package-price">Prix de la boîte (€):</label>
              <input
                type="number"
                id="package-price"
                min="0"
                step="0.01"
                value={details.package_price || ""}
                onChange={(e) => setDetails({...details, package_price: parseFloat(e.target.value) || ""})}
                required
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    
    try {
      const formData = {
        tobacco_type_id: parseInt(selectedType),
        brand,
        quantity_per_day: parseFloat(quantityPerDay),
        unit_of_quantity: unitOfQuantity,
        details,
        start_date: startDate
      };
      
      const result = await onSubmit(formData);
      
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Habitude ajoutée avec succès!" });
        
        // Réinitialiser le formulaire
        setSelectedType("");
        setBrand("");
        setQuantityPerDay("");
        setUnitOfQuantity("");
        setStartDate(new Date().toISOString().split('T')[0]);
        setDetails({});
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setMessage({ type: "error", text: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tobacco-habit-form">
      <div className="form-group">
        <label htmlFor="tobacco-type">Type de tabac:</label>
        <select
          id="tobacco-type"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setUnitOfQuantity(""); // Réinitialiser l'unité lors du changement de type
            setDetails({}); // Réinitialiser les détails spécifiques
          }}
          required
        >
          <option value="">Sélectionnez un type</option>
          {tobaccoTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      
      {selectedType && (
        <>
          {parseInt(selectedType) === 4 ? (
            // Pour les cigarettes électroniques, on définit une valeur par défaut sans afficher le champ
            <input
              type="hidden"
              id="brand"
              value="Cigarette électronique"
              onChange={() => {}}
            />
          ) : (
            <div className="form-group">
              <label htmlFor="brand">Marque:</label>
              {parseInt(selectedType) === 1 ? (
              // Pour les cigarettes classiques
              <select
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option value="">Sélectionnez une marque</option>
                {brandsList.cigarettes.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
                <option value="autre">Autre...</option>
              </select>
            ) : parseInt(selectedType) === 2 || parseInt(selectedType) === 3 ? (
              // Pour les cigarettes roulées et pots de tabac
              <select
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option value="">Sélectionnez une marque</option>
                {brandsList.rolling.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
                <option value="autre">Autre...</option>
              </select>
            ) : parseInt(selectedType) === 7 ? (
              // Pour les cigares
              <select
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option value="">Sélectionnez une marque</option>
                {brandsList.cigars.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
                <option value="autre">Autre...</option>
              </select>
            ) : parseInt(selectedType) === 5 ? (
              // Pour le tabac à chiquer
              <select
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              >
                <option value="">Sélectionnez une marque</option>
                {brandsList.chewing.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
                <option value="autre">Autre...</option>
              </select>
            ) : (
              // Pour les autres types
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            )}
            {brand === "autre" && (
              <div className="form-group mt-2">
                <label htmlFor="custom-brand">Précisez la marque:</label>
                <input
                  type="text"
                  id="custom-brand"
                  value={details.custom_brand || ""}
                  onChange={(e) => {
                    setDetails({...details, custom_brand: e.target.value});
                    if (e.target.value) {
                      setBrand(e.target.value);
                    }
                  }}
                  required
                />
              </div>
            )}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="quantity-per-day">Quantité par jour:</label>
            <input
              type="number"
              id="quantity-per-day"
              min="0.1"
              step="0.1"
              value={quantityPerDay}
              onChange={(e) => setQuantityPerDay(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="unit-of-quantity">Unité:</label>
            <select
              id="unit-of-quantity"
              value={unitOfQuantity}
              onChange={(e) => setUnitOfQuantity(e.target.value)}
              required
            >
              <option value="">Sélectionnez une unité</option>
              {getUnitOptions().map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="start-date">Date de début:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          {renderTypeSpecificFields()}
        </>
      )}
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting || !selectedType}
      >
        {isSubmitting ? "Enregistrement..." : "Ajouter cette habitude"}
      </button>
    </form>
  );
}

export default TobaccoHabitForm;
