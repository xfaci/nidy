import { createBrowserClient } from '@supabase/ssr'

/**
 * Crée un client Supabase pour le côté client (navigateur).
 * Utilise les variables d'environnement publiques pour l'initialisation.
 * 
 * @returns {SupabaseClient} Instance du client Supabase configurée pour le navigateur
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
