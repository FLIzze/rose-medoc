import { Dispatch, SetStateAction } from "react";

export default function prevWeek(
    currentDate: Date,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    calendarMode: string
) {
    const newDate = new Date(currentDate);

    if (calendarMode === "Semaine") {
        newDate.setDate(newDate.getDate() - 7);
    } else if (calendarMode === "Mois") {
        newDate.setMonth(newDate.getMonth() - 1);
    } else if (calendarMode === "jour") {
        newDate.setDate(newDate.getDate() - 1);
    }

    setCurrentDate(newDate);
}