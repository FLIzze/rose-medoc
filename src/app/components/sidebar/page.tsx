import MonthlyCal from "../monthly-calendar/page"
import Filters from "../filters/page"
import { Dispatch, SetStateAction } from "react"

interface SidebarProps {
    setCurrentDay: Dispatch<SetStateAction<number>>,
    currentMonth: number,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    currentYear: number,
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
    setLocalYear: Dispatch<SetStateAction<number>>
}

export default function Sidebar({
    setCurrentDay,
    currentMonth,
    setCurrentMonth,
    currentYear,
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
    setLocalYear }: SidebarProps) {

    return (
        <div>
            <MonthlyCal
                setCurrentDay={setCurrentDay}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                currentYear={currentYear}
                setCurrentYear={setCurrentYear}
                localMonth={localMonth}
                setLocalMonth={setLocalMonth}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                localYear={localYear}
                setLocalYear={setLocalYear}
            />

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