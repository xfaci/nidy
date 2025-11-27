'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit faire au moins 2 caractères.",
    }),
    description: z.string().optional(),
    date: z.date({
        message: "Une date est requise.",
    }),
    location: z.string().min(2, {
        message: "Le lieu est requis.",
    }),
    address: z.string().optional(),
    city: z.string().min(1, { message: "La ville est requise." }),
    price_min: z.string().optional(),
    price_max: z.string().optional(),
    external_ticket_link: z.string().optional().or(z.literal("")),
})

export function CreateEventForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            location: "",
            address: "",
            city: "",
            description: "",
            price_min: "",
            price_max: "",
            external_ticket_link: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error("Vous devez être connecté pour créer un événement.")
                return
            }

            // Fetch user profile to get organizer type
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()

            if (profileError) throw profileError

            const eventData = {
                title: values.title,
                description: values.description,
                date: values.date.toISOString(),
                location: values.location,
                address: values.address,
                city: values.city,
                price_min: values.price_min ? Number(values.price_min) : null,
                price_max: values.price_max ? Number(values.price_max) : null,
                external_ticket_link: values.external_ticket_link,
                organizer_id: user.id,
                organizer_type: (profile?.role === 'bde' || profile?.role === 'bar') ? profile.role : 'student',
                status: 'published',
                image_url: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2000&auto=format&fit=crop', // Placeholder
            }

            const { error } = await supabase
                .from('events')
                .insert(eventData)

            if (error) throw error

            router.push('/dashboard/events')
            router.refresh()
            toast.success("L'événement a été créé avec succès.")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Une erreur est survenue lors de la création de l'événement.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Titre de l'événement</FormLabel>
                            <FormControl>
                                <Input placeholder="Soirée d'intégration..." {...field} className="bg-white/5 border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Choisir une date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-[#0F0F0F] border-white/10" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                            className="bg-[#0F0F0F] text-white"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Ville</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                            <SelectValue placeholder="Sélectionner une ville" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-[#0F0F0F] border-white/10 text-white">
                                        <SelectItem value="Paris">Paris</SelectItem>
                                        <SelectItem value="Lyon">Lyon</SelectItem>
                                        <SelectItem value="Bordeaux">Bordeaux</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Lieu (Nom de l'établissement)</FormLabel>
                            <FormControl>
                                <Input placeholder="Le Duplex" {...field} className="bg-white/5 border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="price_min"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Prix Min (€)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} className="bg-white/5 border-white/10 text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price_max"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Prix Max (€)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} className="bg-white/5 border-white/10 text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="external_ticket_link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Lien Billetterie (Shotgun, etc.)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://shotgun.live/..." {...field} className="bg-white/5 border-white/10 text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Détails de la soirée..."
                                    className="resize-none bg-white/5 border-white/10 text-white min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-[#6B5BFF] hover:bg-[#5a4bd1] text-white" disabled={isLoading}>
                    {isLoading ? "Création en cours..." : "Créer l'événement"}
                </Button>
            </form>
        </Form>
    )
}
