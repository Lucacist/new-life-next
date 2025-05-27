/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuration pour Netlify
  // Utiliser le mode standalone qui est mieux pris en charge par Netlify
  output: 'standalone',
  // Ignorer les erreurs de type lors du build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignorer les erreurs ESLint lors du build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Supprimer les configurations expérimentales qui causent des problèmes
  distDir: '.next',
};

module.exports = nextConfig;
