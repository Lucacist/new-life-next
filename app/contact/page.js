'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, message: '' });

    try {
      // Avec Netlify Forms, le formulaire est traité automatiquement
      // lorsqu'il est soumis avec l'attribut data-netlify="true"
      // Nous simulons ici le comportement pour le développement local
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simuler une réponse réussie
      setStatus({
        submitting: false,
        success: true,
        message: 'Votre message a été envoyé avec succès!'
      });
      
      // Réinitialiser le formulaire en cas de succès
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erreur:', error);
      setStatus({
        submitting: false,
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.'
      });
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <p>Vous pouvez nous contacter via les informations ci-dessous:</p>
      <ul>
        <li>Email: exemple@email.com</li>
        <li>Téléphone: +33 1 23 45 67 89</li>
        <li>Adresse: 123 Rue Exemple, 75000 Paris, France</li>
      </ul>
      
      {status.message && (
        <div className={`message ${status.success ? 'success' : 'error'}`}>
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={status.submitting}>
          {status.submitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
}
