import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect } from 'next/navigation'
import { User, LogOut } from 'lucide-react'

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="min-h-screen bg-[#0F0F0F]">
            <Header />

            <main className="container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-white">Mon Profil</h1>
                        <form action="/auth/signout" method="post">
                            <Button variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0">
                                <LogOut className="mr-2 h-4 w-4" />
                                Déconnexion
                            </Button>
                        </form>
                    </div>

                    <Card className="bg-[#0F0F0F]/60 backdrop-blur-xl border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Informations personnelles
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-white">Email</Label>
                                <Input value={profile?.email} disabled className="bg-white/5 border-white/10 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white">Rôle</Label>
                                <Input value={profile?.role} disabled className="bg-white/5 border-white/10 text-gray-400 capitalize" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-white">École</Label>
                                <Input value={profile?.school_name || 'Non renseigné'} disabled className="bg-white/5 border-white/10 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#0F0F0F]/60 backdrop-blur-xl border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Mes sorties prévues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-400 text-sm">Vous n'avez pas encore d'événements prévus.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
