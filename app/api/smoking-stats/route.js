export async function GET() {
  // Données basées sur les statistiques de l'OMS et de la Banque Mondiale
  const smokingData = {
    global: {
      total: 22.3, // pourcentage de la population mondiale qui consomme du tabac
      men: 36.7,   // pourcentage d'hommes
      women: 7.8,  // pourcentage de femmes
    },
    source: "Organisation Mondiale de la Santé (OMS), 2020"
  };

  return Response.json(smokingData);
}
