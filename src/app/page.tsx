import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { EventCard } from '@/components/EventCard'
import { EventFilters } from '@/components/EventFilters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import EventMapWrapper from '@/components/EventMapWrapper'

// Mock data for initial display
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Nuit des Étudiants - BDE Sciences Po',
    date: '2025-11-28T22:00:00',
    location: 'Le Duplex, Paris',
    imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070&auto=format&fit=crop',
    priceMin: 15,
    priceMax: 25,
    isBoosted: true,
    organizerName: 'BDE Sciences Po',
    latitude: 48.8718,
    longitude: 2.2925,
  },
  {
    id: '2',
    title: 'Afterwork HEC x ESSEC',
    date: '2025-11-29T19:00:00',
    location: 'Wanderlust, Paris',
    imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=2000&auto=format&fit=crop',
    priceMin: 10,
    priceMax: 20,
    isBoosted: false,
    organizerName: 'HEC Paris',
    latitude: 48.8412,
    longitude: 2.3700,
  },
  {
    id: '3',
    title: 'Erasmus Party - International Night',
    date: '2025-11-30T23:00:00',
    location: 'Mix Club, Paris',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop',
    priceMin: 12,
    priceMax: 15,
    isBoosted: false,
    organizerName: 'Erasmus Paris',
    latitude: 48.8420,
    longitude: 2.3220,
  },
  {
    id: '4',
    title: 'Soirée Intégration Médecine',
    date: '2025-12-01T21:00:00',
    location: 'Le Bridge, Paris',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
    priceMin: 20,
    priceMax: 30,
    isBoosted: true,
    organizerName: 'Corpo Médecine',
    latitude: 48.8635,
    longitude: 2.3135,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]" />
          </div>

          <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-5xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl">
            Toutes les soirées <br />
            <span className="text-gradient-primary">étudiantes d'Île-de-France.</span>
          </h1>

          <p className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 mt-6 max-w-[600px] text-lg text-gray-400 sm:text-xl">
            Find your night. Découvrez les meilleurs événements, organisés par les BDE et les clubs les plus exclusifs.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 mt-10 w-full max-w-2xl">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-50 blur transition duration-500 group-hover:opacity-75" />
              <div className="relative flex items-center rounded-full bg-[#0F0F0F] p-2 ring-1 ring-white/10">
                <Search className="ml-4 h-6 w-6 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher une soirée, une école, un lieu..."
                  className="border-0 bg-transparent text-lg text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="rounded-full bg-white px-8 py-6 text-black hover:bg-gray-200">
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-bold text-white">Prochains événements</h2>
            <EventFilters />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="grid gap-6 sm:grid-cols-2">
              {MOCK_EVENTS.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <EventMapWrapper events={MOCK_EVENTS} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
