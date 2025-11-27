import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0F0F0F]/60 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    NIDY<span className="text-primary">.</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/events" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Events
                    </Link>
                    <Link href="/map" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Map
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/auth/login">
                        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white border-0">
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
