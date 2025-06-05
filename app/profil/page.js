"use client";

import { useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import ProfileHeader from "../components/ProfileHeader";
import SmokingStatusForm from "../components/SmokingStatusForm";
import TobaccoHabitForm from "../components/TobaccoHabitForm";
import UserHabitsList from "../components/UserHabitsList";
import "./profil.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [smokingStatus, setSmokingStatus] = useState(null);
  const [tobaccoTypes, setTobaccoTypes] = useState([]);
  const [userHabits, setUserHabits] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Vérifier l'authentification
        const { user, error } = await getCurrentUser();
        if (error || !user) {
          router.push("/login");
          return;
        }
        
        setUser(user);
        
        // Récupérer le statut de sevrage tabagique
        const { data: statusData } = await supabase
          .from('smoking_status')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setSmokingStatus(statusData);
        
        // Récupérer les types de tabac (pour les formulaires)
        const { data: typesData } = await supabase
          .from('tobacco_types')
          .select('*')
          .order('name');
        
        setTobaccoTypes(typesData || []);
        
        // Récupérer les habitudes de tabac de l'utilisateur
        const { data: habitsData } = await supabase
          .from('user_tobacco_habits')
          .select('*, tobacco_types(name)')
          .eq('user_id', user.id)
          .order('is_current_habit', { ascending: false });
        
        setUserHabits(habitsData || []);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Fonction pour mettre à jour le statut de sevrage
  const updateSmokingStatus = async (formData) => {
    if (!user) return;
    
    const hasQuit = formData.has_quit === true;
    const quitDate = hasQuit ? formData.quit_date : null;
    
    try {
      // Vérifier si un statut existe déjà
      if (smokingStatus?.id) {
        // Mettre à jour le statut existant
        const { error } = await supabase
          .from('smoking_status')
          .update({
            has_quit: hasQuit,
            quit_date: quitDate,
            updated_at: new Date().toISOString()
          })
          .eq('id', smokingStatus.id);
          
        if (error) throw error;
      } else {
        // Créer un nouveau statut
        const { error } = await supabase
          .from('smoking_status')
          .insert({
            user_id: user.id,
            has_quit: hasQuit,
            quit_date: quitDate
          });
          
        if (error) throw error;
      }
      
      // Rafraîchir les données
      const { data } = await supabase
        .from('smoking_status')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      setSmokingStatus(data);
      
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      return { error: error.message };
    }
  };

  // Fonction pour ajouter une nouvelle habitude de tabac
  const addTobaccoHabit = async (formData) => {
    if (!user) return;
    
    try {
      // Préparer les données pour l'insertion
      const habitData = {
        user_id: user.id,
        tobacco_type_id: formData.tobacco_type_id,
        is_current_habit: true,
        brand: formData.brand,
        quantity_per_day: formData.quantity_per_day,
        unit_of_quantity: formData.unit_of_quantity,
        details: formData.details,
        start_date: formData.start_date || new Date().toISOString().split('T')[0]
      };
      
      // Insérer la nouvelle habitude
      const { error } = await supabase
        .from('user_tobacco_habits')
        .insert(habitData);
        
      if (error) throw error;
      
      // Rafraîchir la liste des habitudes
      const { data: habitsData } = await supabase
        .from('user_tobacco_habits')
        .select('*, tobacco_types(name)')
        .eq('user_id', user.id)
        .order('is_current_habit', { ascending: false });
      
      setUserHabits(habitsData || []);
      
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'habitude:", error);
      return { error: error.message };
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="profile-container">
      <ProfileHeader user={user} />
      
      <div className="profile-section">
        <h2>Mon statut tabagique</h2>
        <SmokingStatusForm 
          initialData={smokingStatus} 
          onSubmit={updateSmokingStatus} 
        />
      </div>
      
      <div className="profile-section">
        <h2>Mes habitudes de consommation</h2>
        {userHabits && userHabits.length > 0 ? (
          <UserHabitsList habits={userHabits} />
        ) : (
          <p>Vous n'avez pas encore ajouté d'habitudes de consommation.</p>
        )}
        
        <div className="add-habit-section">
          <h3>Ajouter une nouvelle habitude</h3>
          <TobaccoHabitForm 
            tobaccoTypes={tobaccoTypes} 
            onSubmit={addTobaccoHabit} 
          />
        </div>
      </div>
    </div>
  );
}
