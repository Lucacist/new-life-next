/** @type {import('next').NextConfig} */
const nextConfig = {
  // Forcer toutes les pages à être rendues côté client ou serveur, jamais statiquement
  // Cela résoudra les problèmes avec Supabase lors du build sur Netlify
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Configurer les routes pour qu'elles soient toutes dynamiques
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
