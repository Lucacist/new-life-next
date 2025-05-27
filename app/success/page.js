'use client';

import Link from 'next/link';

export default function Success() {
  return (
    <div className="success-container">
      <div className="success-card">
        <h1>Message envoyé avec succès !</h1>
        <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
        <div className="success-links">
          <Link href="/" className="button">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
