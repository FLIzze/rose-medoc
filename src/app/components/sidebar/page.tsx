import Filters from "../filters/page"
import { Dispatch, SetStateAction } from "react"
import SideMonthlyCal from "../side-monthly-calendar/page"
import { EventInterface } from "@/app/model/event"

interface SidebarProps {
    sidebarDate: Date,
    setSidebarDate: Dispatch<SetStateAction<Date>>,
    setDate: Dispatch<SetStateAction<Date>>,
    own: boolean,
    tagged: boolean,
    others: boolean,
    setOwn: Dispatch<SetStateAction<boolean>>,
    setTagged: Dispatch<SetStateAction<boolean>>,
    setOthers: Dispatch<SetStateAction<boolean>>,
    filteredEvents: EventInterface[],
}

export default function Sidebar({
    sidebarDate,
    setSidebarDate,
    setDate,
    own,
    tagged,
    others,
    setOwn,
    setTagged,
    setOthers,
    filteredEvents }: Readonly<SidebarProps>) {

    return (
        <div className="pl-4">
            <SideMonthlyCal
                sidebarDate={sidebarDate}
                setSidebarDate={setSidebarDate}
                setDate={setDate}
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
                src="logo.png"
                alt="logo Rose Medoc"
            />
        </div>
    )
}