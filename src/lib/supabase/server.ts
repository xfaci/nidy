import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Crée un client Supabase pour le côté serveur (Server Components, Server Actions, API Routes).
 * Gère automatiquement les cookies pour l'authentification.
 * 
 * @returns {Promise<SupabaseClient>} Instance du client Supabase configurée pour le serveur
 */
export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                /**
                 * Récupère tous les cookies de la requête actuelle.
                 */
                getAll() {
                    return cookieStore.getAll()
                },
                /**
                 * Définit, modifie ou supprime des cookies.
                 * Note : Cette méthode peut être appelée dans des Server Actions ou Route Handlers,
                 * mais pas directement dans des Server Components (qui sont en lecture seule pour les cookies).
                 */
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // Ignorer l'erreur si appelée depuis un Server Component
                        // Cela peut arriver lors du rafraîchissement de session automatique
                    }
                },
            },
        }
    )
}
