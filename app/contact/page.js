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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({
          submitting: false,
          success: true,
          message: data.message
        });
        // Réinitialiser le formulaire en cas de succès
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: data.message || 'Une erreur est survenue.'
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setStatus({
        submitting: false,
        success: false,
        message: 'Une erreur technique est survenue. Veuillez réessayer plus tard.'
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
      
      <form className="contact-form" onSubmit={handleSubmit}>
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
