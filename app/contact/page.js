'use client';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1>Contactez-nous</h1>
        <p>Pour toute question ou information, vous pouvez nous contacter par email à l'adresse suivante :</p>
        <p className="contact-email">contact@new-life.fr</p>
        
        <div className="contact-info">
          <h2>Adresse</h2>
          <p>123 Avenue de la Santé</p>
          <p>75001 Paris, France</p>
          
          <h2>Téléphone</h2>
          <p>+33 (0)1 23 45 67 89</p>
        </div>
      </div>
    </div>
  );
}
