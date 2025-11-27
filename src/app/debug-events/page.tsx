import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function DebugEventsPage() {
    const supabase = await createClient()

    // Récupération des 5 derniers événements
    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

    // Récupération de l'utilisateur actuel pour tester l'auth
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="container mx-auto p-10 space-y-8 bg-black min-h-screen text-white">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Debug Supabase Connection
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Status Auth */}
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>État Authentification</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user ? (
                            <div className="space-y-2">
                                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Connecté</Badge>
                                <p className="text-sm text-zinc-400">Email: {user.email}</p>
                                <p className="text-sm text-zinc-400">ID: {user.id}</p>
                            </div>
                        ) : (
                            <Badge variant="destructive">Non connecté</Badge>
                        )}
                    </CardContent>
                </Card>

                {/* Status Database */}
                <Card className="bg-zinc-900 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>État Base de Données</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error ? (
                            <div className="text-red-400">
                                <p>Erreur de connexion :</p>
                                <pre className="mt-2 p-2 bg-red-950/30 rounded text-xs overflow-auto">
                                    {JSON.stringify(error, null, 2)}
                                </pre>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                                    Connecté
                                </Badge>
                                <p className="text-sm text-zinc-400">
                                    {events?.length || 0} événements trouvés
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Events List */}
            <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                    <CardTitle>Derniers Événements (Raw Data)</CardTitle>
                </CardHeader>
                <CardContent>
                    {events && events.length > 0 ? (
                        <pre className="p-4 bg-black/50 rounded-lg overflow-auto max-h-[500px] text-xs font-mono text-green-400">
                            {JSON.stringify(events, null, 2)}
                        </pre>
                    ) : (
                        <p className="text-zinc-500 italic">Aucun événement à afficher.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
