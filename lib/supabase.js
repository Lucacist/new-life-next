import { createClient } from '@supabase/supabase-js';

// Variable pour stocker l'instance du client Supabase
let supabaseInstance = null;

// Fonction pour obtenir le client Supabase
function getSupabaseClient() {
  // Si nous sommes côté serveur pendant le build, retourner un client factice
  if (typeof window === 'undefined') {
    return {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    };
  }
  
  // Si nous sommes côté client et que le client existe déjà, le retourner
  if (supabaseInstance) {
    return supabaseInstance;
  }
  
  // Sinon, créer un nouveau client (uniquement côté client)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is missing');
    return {
      auth: {
        signUp: () => Promise.resolve({ data: null, error: new Error('Supabase configuration missing') }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase configuration missing') }),
        signOut: () => Promise.resolve({ error: new Error('Supabase configuration missing') }),
        getUser: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase configuration missing') }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    };
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// Exporter la fonction getSupabaseClient pour l'utilisation dans d'autres composants
export { getSupabaseClient };

// Pour la compatibilité avec le code existant, exporter également le client directement
// mais uniquement côté client
export const supabase = typeof window !== 'undefined' ? getSupabaseClient() : null;

// Fonctions d'authentification avec gestion des erreurs de build
export const signUp = async (email, password, firstName, lastName) => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
    return { data, error };
  } catch (error) {
    console.error('Error in signUp:', error);
    return { data: null, error };
  }
};

export const signIn = async (email, password) => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('Error in signIn:', error);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const client = getSupabaseClient();
    const { error } = await client.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Error in signOut:', error);
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const client = getSupabaseClient();
    const { data: { user }, error } = await client.auth.getUser();
    return { user, error };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return { user: null, error };
  }
};
