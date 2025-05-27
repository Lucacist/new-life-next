export async function GET() {
  return Response.json({
    message: "Bonjour depuis l'API Next.js !",
    timestamp: new Date().toISOString()
  });
}
