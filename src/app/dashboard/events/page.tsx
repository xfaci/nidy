import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { PlusCircle, Calendar, Edit, Trash2, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function EventsListPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: events } = await supabase
        .from('events')
        .select('*')
        .eq('organizer_id', user?.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Mes événements</h1>
                    <p className="text-gray-400">Gérez vos soirées et suivez leurs performances.</p>
                </div>
                <Link href="/dashboard/events/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Créer un événement
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {events?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                        <Calendar className="h-12 w-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-white">Aucun événement</h3>
                        <p className="text-gray-400 mb-4">Vous n'avez pas encore créé d'événement.</p>
                        <Link href="/dashboard/events/new">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                                Commencer maintenant
                            </Button>
                        </Link>
                    </div>
                ) : (
                    events?.map((event) => (
                        <div key={event.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0F0F0F]/60 p-4 backdrop-blur-xl transition-colors hover:border-primary/30">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-lg bg-white/5">
                                    {event.image_url ? (
                                        <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-500">
                                            <Calendar className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">{event.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <span>{new Date(event.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge variant={event.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                                            {event.status === 'published' ? 'Publié' : 'Brouillon'}
                                        </Badge>
                                        {event.status === 'boosted' && (
                                            <Badge variant="outline" className="border-primary text-primary text-xs">
                                                Boosté
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{event.views_count || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" />
                                        <span>{event.interested_count || 0}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
