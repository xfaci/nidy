import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Share2, Ticket, Users } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EventMapWrapper from '@/components/EventMapWrapper'

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: event } = await supabase
        .from('events')
        .select('*, profiles(school_name)')
        .eq('id', params.id)
        .single()

    // If no event found in DB, try to find in mock data (for demo purposes if DB is empty)
    // In a real app, we would just return notFound()
    if (!event) {
        // For now, let's just show 404 if not found in DB to be strict
        // notFound()

        // OR return a placeholder for development if needed, but better to stick to real data flow
        // For this demo, I'll assume we might want to see the layout even without DB data, 
        // but correct practice is 404.
        // Let's stick to 404 for correctness.
        // notFound()
    }

    // Mock data fallback for visualization if DB is empty (REMOVE IN PRODUCTION)
    const displayEvent = event || {
        id: params.id,
        title: 'Soirée Exemple (Données Mock)',
        description: 'Ceci est un événement exemple car aucun événement n\'a été trouvé dans la base de données avec cet ID. En production, cela retournerait une 404.',
        date: new Date().toISOString(),
        location: 'Le Duplex',
        address: '2bis Avenue Foch, 75116 Paris',
        city: 'Paris',
        price_min: 15,
        price_max: 20,
        image_url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070&auto=format&fit=crop',
        organizer_type: 'bde',
        status: 'published',
        views_count: 120,
        interested_count: 45,
        latitude: 48.8718,
        longitude: 2.2925,
        profiles: { school_name: 'BDE Sciences Po' }
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F]">
            <Header />

            <main>
                {/* Hero Image */}
                <div className="relative h-[50vh] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F0F0F] z-10" />
                    <img
                        src={displayEvent.image_url || '/placeholder-event.jpg'}
                        alt={displayEvent.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
                    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                        {/* Main Content */}
                        <div className="space-y-8">
                            <div className="rounded-2xl border border-white/10 bg-[#0F0F0F]/80 p-8 backdrop-blur-xl shadow-2xl">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0">
                                        {displayEvent.profiles?.school_name || 'Organisateur'}
                                    </Badge>
                                    {displayEvent.status === 'boosted' && (
                                        <Badge className="bg-gradient-to-r from-primary to-accent border-0">
                                            Boosté
                                        </Badge>
                                    )}
                                </div>

                                <h1 className="text-4xl font-bold text-white mb-4">{displayEvent.title}</h1>

                                <div className="flex flex-col gap-4 text-gray-300 mb-8">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <span className="text-lg">
                                            {new Date(displayEvent.date).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-accent" />
                                        <span className="text-lg">{displayEvent.location} - {displayEvent.address}, {displayEvent.city}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Ticket className="h-5 w-5 text-secondary" />
                                        <span className="text-lg">
                                            {displayEvent.price_min === 0 ? 'Gratuit' : `${displayEvent.price_min}€${displayEvent.price_max ? ` - ${displayEvent.price_max}€` : ''}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <h3 className="text-xl font-semibold text-white mb-4">À propos de l'événement</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">
                                        {displayEvent.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="sticky top-24 space-y-6">
                                {/* Action Card */}
                                <div className="rounded-xl border border-white/10 bg-[#0F0F0F]/60 p-6 backdrop-blur-xl">
                                    <div className="mb-6 text-center">
                                        <span className="text-3xl font-bold text-white">
                                            {displayEvent.price_min === 0 ? 'Gratuit' : `${displayEvent.price_min}€`}
                                        </span>
                                        {displayEvent.price_max && <span className="text-gray-400 text-sm ml-2">à {displayEvent.price_max}€</span>}
                                    </div>

                                    <div className="space-y-3">
                                        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0 h-12 text-lg font-semibold rounded-full">
                                            J'y vais
                                        </Button>
                                        {displayEvent.external_ticket_link && (
                                            <a href={displayEvent.external_ticket_link} target="_blank" rel="noopener noreferrer" className="block">
                                                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-12 rounded-full">
                                                    Billetterie externe
                                                </Button>
                                            </a>
                                        )}
                                    </div>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                                        <Users className="h-4 w-4" />
                                        <span>{displayEvent.interested_count} intéressés</span>
                                    </div>
                                </div>

                                {/* Map Card */}
                                <div className="rounded-xl border border-white/10 bg-[#0F0F0F]/60 p-1 backdrop-blur-xl overflow-hidden">
                                    <EventMapWrapper events={[displayEvent]} />
                                </div>

                                {/* Share */}
                                <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Partager l'événement
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
