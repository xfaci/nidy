'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Filter } from 'lucide-react'
import { useState } from 'react'

export function EventFilters() {
    const [date, setDate] = useState<Date>()

    return (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#0F0F0F]/60 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-white">
                <Filter className="h-5 w-5 text-primary" />
                <span className="font-medium">Filtres</span>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Choisir une date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#0F0F0F] border-white/10 text-white" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="bg-[#0F0F0F] text-white"
                    />
                </PopoverContent>
            </Popover>

            <Select>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F0F0F] border-white/10 text-white">
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="bordeaux">Bordeaux</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F0F0F] border-white/10 text-white">
                    <SelectItem value="free">Gratuit</SelectItem>
                    <SelectItem value="paid">Payant</SelectItem>
                </SelectContent>
            </Select>

            <Button className="ml-auto bg-primary hover:bg-primary/90 text-white rounded-full">
                Appliquer
            </Button>
        </div>
    )
}
