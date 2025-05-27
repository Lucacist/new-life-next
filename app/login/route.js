// Désactiver le prérendu statique pour cette route
export const dynamic = 'force-dynamic';

// Cette fonction est nécessaire pour que Next.js considère ce fichier comme une route valide
export async function GET() {
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/login',
    },
  });
}
