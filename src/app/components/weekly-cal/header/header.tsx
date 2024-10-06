import { calendarModeAtom, dateAtom } from "@/app/atom";
import goToDailyCalendar from "@/app/date/goToDailyCalendar";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default function Header() {
    const calendarMode = useAtomValue(calendarModeAtom);

    const [date, setDate] = useAtom(dateAtom);

    const setCalendarMode = useSetAtom(calendarModeAtom);

    return (
        <div>
            {calendarMode === "Semaine" && (
                <div
                    className="flex-none grid grid-cols-9 w-full"
                    style={{ gridTemplateColumns: '4rem repeat(8, 1fr)' }}
                >
                    <div className="bg-white">
                        {/* Empty cell for the top-left corner */}
                    </div>
                    {Array.from({ length: 7 }).map((day, dayIndex) => {
                        const currentDate = new Date(date);
                        currentDate.setDate(date.getDate() - date.getDay() + dayIndex + 1);
                        const dayName = currentDate.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase();
                        return (
                            <button
                                className="bg-white"
                                // key={day as number + dayIndex + "week"}
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
            )}

            {calendarMode === "Jour" && (
                <div className="ml-20">
                    <p className="text-light-pink text-xs">{date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}</p>
                    <p className="text-2xl font-semibold text-dark-pink">{date.getDate()}</p>
                </div>
            )}
        </div>
    )
}