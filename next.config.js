/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuration pour Netlify
  // Générer un site statique pour le déploiement sur Netlify
  output: 'export',
  // Désactiver l'optimisation des images car elle n'est pas compatible avec 'output: export'
  images: {
    unoptimized: true,
  },
  // Exclure les routes API du build statique
  // puisque nous utilisons maintenant des fichiers JSON statiques
  distDir: 'out',
  // Ignorer les erreurs de type lors du build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignorer les erreurs ESLint lors du build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
