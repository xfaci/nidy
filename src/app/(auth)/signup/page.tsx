'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')
    const [schoolName, setSchoolName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role,
                        school_name: schoolName,
                    },
                },
            })

            if (signUpError) throw signUpError

            // Create profile record
            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        email: email,
                        role: role,
                        school_name: schoolName,
                    })

                if (profileError) {
                    console.error('Error creating profile:', profileError)
                    // Continue anyway as auth was successful
                }
            }

            router.push('/')
            router.refresh()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4 py-12">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]" />
            </div>

            <Card className="relative z-10 w-full max-w-md border-white/10 bg-[#0F0F0F]/60 backdrop-blur-xl">
                <CardHeader className="space-y-1 text-center">
                    <Link href="/" className="mx-auto mb-4 text-3xl font-bold tracking-tighter text-white">
                        NIDY<span className="text-primary">.</span>
                    </Link>
                    <CardTitle className="text-2xl font-bold text-white">Créer un compte</CardTitle>
                    <CardDescription>Rejoignez la communauté NIDY</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Je suis</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue placeholder="Sélectionnez votre rôle" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0F0F0F] border-white/10 text-white">
                                    <SelectItem value="student">Étudiant</SelectItem>
                                    <SelectItem value="bde">BDE / Asso</SelectItem>
                                    <SelectItem value="bar">Bar / Club</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {role === 'student' && (
                            <div className="space-y-2">
                                <Label htmlFor="school">École / Université</Label>
                                <Input
                                    id="school"
                                    type="text"
                                    placeholder="Ex: HEC, Sorbonne..."
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="text-sm text-red-500">
                                {error}
                            </div>
                        )}
                        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 border-0" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            S'inscrire
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-gray-400">
                    <Link href="/auth/login" className="hover:text-primary hover:underline">
                        Déjà un compte ? Se connecter
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
