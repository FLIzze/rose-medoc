import Filters from "../filters/page"
import { Dispatch, SetStateAction } from "react"
import SideMonthlyCal from "../side-monthly-calendar/page"
import { EventInterface } from "@/app/model/event"

interface SidebarProps {
    setCurrentDay: Dispatch<SetStateAction<number>>,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    setCurrentYear: Dispatch<SetStateAction<number>>,
    localMonth: number,
    setLocalMonth: Dispatch<SetStateAction<number>>,
    currentDate: Date,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    own: boolean,
    tagged: boolean,
    others: boolean,
    setOwn: Dispatch<SetStateAction<boolean>>,
    setTagged: Dispatch<SetStateAction<boolean>>,
    setOthers: Dispatch<SetStateAction<boolean>>,
    localYear: number,
    setLocalYear: Dispatch<SetStateAction<number>>,
    filteredEvents: EventInterface[]
}

export default function Sidebar({
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
    localMonth,
    setLocalMonth,
    currentDate,
    setCurrentDate,
    own,
    tagged,
    others,
    setOwn,
    setTagged,
    setOthers,
    localYear,
    setLocalYear,
    filteredEvents }: SidebarProps) {

    return (
        <div className="pl-4">
            <SideMonthlyCal
                setCurrentDay={setCurrentDay}
                setCurrentMonth={setCurrentMonth}
                setCurrentYear={setCurrentYear}
                localMonth={localMonth}
                setLocalMonth={setLocalMonth}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                localYear={localYear}
                setLocalYear={setLocalYear}
                own={own}
                tagged={tagged}
                others={others}
                filteredEvents={filteredEvents}
            />

            <hr className="mb-5 border border-dark-pink"/>

            <Filters
                own={own}
                tagged={tagged}
                setOwn={setOwn}
                setTagged={setTagged}
                others={others}
                setOthers={setOthers}
            />

            <img
                className="w-96 h-96 object-cover pointer-events-none"
                src="Logo sans fond Asso Patientes.png"
                alt="logo Rose Medoc"
            />
        </div>
    )
}