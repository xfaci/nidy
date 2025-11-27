import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0F0F0F] py-12">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                            NIDY<span className="text-primary">.</span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-400">
                            Find your night. La plateforme de référence pour les soirées étudiantes en Île-de-France.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">Platform</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li><Link href="/events" className="hover:text-primary">Events</Link></li>
                            <li><Link href="/map" className="hover:text-primary">Map</Link></li>
                            <li><Link href="/dashboard" className="hover:text-primary">Organizers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">Legal</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">Contact</h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li><a href="mailto:hello@nidy.app" className="hover:text-primary">hello@nidy.app</a></li>
                            <li>Paris, France</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} NIDY. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
