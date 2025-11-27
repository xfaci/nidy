import Link from 'next/link'
import { Calendar, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EventCardProps {
    id: string
    title: string
    date: string
    location: string
    imageUrl: string
    priceMin?: number
    priceMax?: number
    isBoosted?: boolean
    organizerName: string
}

export function EventCard({
    id,
    title,
    date,
    location,
    imageUrl,
    priceMin,
    priceMax,
    isBoosted,
    organizerName,
}: EventCardProps) {
    return (
        <Link href={`/events/${id}`}>
            <Card className={`group relative overflow-hidden border-0 bg-[#0F0F0F]/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 ${isBoosted ? 'ring-1 ring-primary/50' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden">
                    <img
                        src={imageUrl || '/placeholder-event.jpg'}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent opacity-60" />

                    {isBoosted && (
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-primary to-accent border-0">
                            Boosted
                        </Badge>
                    )}
                </div>

                <CardHeader className="relative z-10 -mt-12 px-4 pb-2">
                    <Badge variant="secondary" className="w-fit bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border-0 mb-2">
                        {organizerName}
                    </Badge>
                    <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </CardHeader>

                <CardContent className="px-4 pb-4">
                    <div className="flex flex-col gap-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span className="line-clamp-1">{location}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
                    <div className="text-white font-semibold">
                        {priceMin === 0 ? 'Gratuit' : `${priceMin}€${priceMax ? ` - ${priceMax}€` : ''}`}
                    </div>
                    <Button size="sm" className="rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors">
                        Voir
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}
