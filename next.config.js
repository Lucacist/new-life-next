/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuration pour Netlify
  // Désactiver le prérendu statique pour éviter les erreurs avec Supabase
  output: 'export',
  // Désactiver l'optimisation des images car elle n'est pas compatible avec 'output: export'
  images: {
    unoptimized: true,
  },
  // Désactiver la génération de routes statiques
  // pour les pages qui utilisent Supabase
  trailingSlash: true,
  distDir: 'out',
};

module.exports = nextConfig;
