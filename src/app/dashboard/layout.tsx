import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, PlusCircle, Calendar, Settings, LogOut } from 'lucide-react'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    // Check if user is an organizer (bde or bar)
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile && !['bde', 'bar', 'admin'].includes(profile.role)) {
        // Redirect students to profile or home if they try to access dashboard
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-[#0F0F0F]/60 backdrop-blur-xl hidden md:flex flex-col">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                        NIDY<span className="text-primary">.</span>
                    </Link>
                    <div className="mt-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Dashboard Organisateur
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Vue d'ensemble
                        </Button>
                    </Link>
                    <Link href="/dashboard/events">
                        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                            <Calendar className="mr-2 h-4 w-4" />
                            Mes événements
                        </Button>
                    </Link>
                    <Link href="/dashboard/events/new">
                        <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Créer un événement
                        </Button>
                    </Link>
                    <Link href="/dashboard/settings">
                        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                            <Settings className="mr-2 h-4 w-4" />
                            Paramètres
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <form action="/auth/signout" method="post">
                        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <LogOut className="mr-2 h-4 w-4" />
                            Déconnexion
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
