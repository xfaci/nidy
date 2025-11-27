import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Users, MousePointerClick, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Vue d'ensemble</h1>
                <p className="text-gray-400">Bienvenue sur votre tableau de bord NIDY.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Vues Totales
                        </CardTitle>
                        <Eye className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12,345</div>
                        <p className="text-xs text-gray-400">
                            +20.1% par rapport au mois dernier
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Intéressés
                        </CardTitle>
                        <Users className="h-4 w-4 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">2,850</div>
                        <p className="text-xs text-gray-400">
                            +15% par rapport au mois dernier
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Clics Billetterie
                        </CardTitle>
                        <MousePointerClick className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">1,429</div>
                        <p className="text-xs text-gray-400">
                            +35% par rapport au mois dernier
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Événements Actifs
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">3</div>
                        <p className="text-xs text-gray-400">
                            2 boostés actuellement
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Aperçu des performances</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-gray-500">
                            Graphique des performances (Placeholder)
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Événements récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">Nuit des Étudiants</p>
                                    <p className="text-sm text-gray-400">
                                        2,341 vues • 154 intéressés
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-primary">+€1,200</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">Afterwork HEC</p>
                                    <p className="text-sm text-gray-400">
                                        1,100 vues • 89 intéressés
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-primary">+€850</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
