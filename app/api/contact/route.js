export async function POST(request) {
  try {
    // Récupérer les données du formulaire
    const formData = await request.json();
    
    // Simuler le traitement du formulaire (dans un vrai projet, vous enverriez un email ou enregistreriez dans une base de données)
    console.log('Données du formulaire reçues:', formData);
    
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Répondre avec succès
    return Response.json({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès!',
      data: formData 
    });
  } catch (error) {
    console.error('Erreur lors du traitement du formulaire:', error);
    
    // Répondre avec une erreur
    return Response.json(
      { success: false, message: 'Une erreur est survenue lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}
