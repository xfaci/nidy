import { CreateEventForm } from '@/components/CreateEventForm'

export default function NewEventPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Créer un événement</h1>
                <p className="text-gray-400">Remplissez les informations ci-dessous pour publier votre soirée.</p>
            </div>

            <div className="bg-[#0F0F0F]/60 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <CreateEventForm />
            </div>
        </div>
    )
}
