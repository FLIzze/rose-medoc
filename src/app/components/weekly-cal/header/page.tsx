import goToDailyCalendar from "@/app/date/goToDailyCalendar";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
    date: Date,
    setDate: Dispatch<SetStateAction<Date>>,
    setCalendarMode: Dispatch<SetStateAction<string>>,
}

export default function Header({ date, setDate, setCalendarMode }: Readonly<HeaderProps>) {
    return (
        <div
            className="flex-none grid grid-cols-9 w-full"
            style={{ gridTemplateColumns: '4rem repeat(8, 1fr)' }}
        >
            <div className="bg-white">
                {/* Empty cell for the top-left corner */}
            </div>
            {Array.from({ length: 7 }).map((_, dayIndex) => {
                const currentDate = new Date(date);
                currentDate.setDate(date.getDate() + dayIndex);
                const dayName = currentDate.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase();
                return (
                    <button
                        className="bg-white"
                        key={dayIndex}
                    >
                        <button
                            className="rounded-full hover:bg-very-light-pink w-fit px-3 py-1"
                            onClick={() => goToDailyCalendar(currentDate, setDate, setCalendarMode)}
                        >
                            <p className="text-light-pink text-xs">{dayName}</p>
                            <p className="text-2xl font-semibold text-dark-pink">{currentDate.getDate()}</p>
                        </button>
                    </button>
                );
            })}
        </div>
    )
}