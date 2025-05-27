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
  // Configuration pour les pages qui utilisent Supabase
  experimental: {
    // Configurer pour que les pages d'authentification fonctionnent correctement
    serverActions: true,
  },
};

module.exports = nextConfig;
