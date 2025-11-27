'use client'

import dynamic from 'next/dynamic'

const EventMap = dynamic(() => import('./EventMap'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full rounded-xl bg-white/5 animate-pulse" />
})

export default function EventMapWrapper(props: any) {
    return <EventMap {...props} />
}
