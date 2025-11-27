'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { EventCard } from './EventCard'

// Fix Leaflet icon issue in Next.js
const icon = L.icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

// Custom Violet Marker
const violetIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #6B5BFF; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #6B5BFF;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
})

interface EventMapProps {
    events: any[] // Replace with proper type
}

export default function EventMap({ events }: EventMapProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <div className="h-[400px] w-full rounded-xl bg-white/5 animate-pulse" />
    }

    return (
        <div className="h-[400px] w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
            <MapContainer
                center={[48.8566, 2.3522]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {events.map((event) => (
                    event.latitude && event.longitude && (
                        <Marker
                            key={event.id}
                            position={[event.latitude, event.longitude]}
                            icon={violetIcon}
                        >
                            <Popup className="glass-popup">
                                <div className="w-[200px]">
                                    <h3 className="font-bold text-gray-900">{event.title}</h3>
                                    <p className="text-sm text-gray-600">{event.location}</p>
                                    <a href={`/events/${event.id}`} className="text-xs text-primary hover:underline">Voir détails</a>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    )
}
