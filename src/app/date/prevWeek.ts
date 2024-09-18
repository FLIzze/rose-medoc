import { Dispatch, SetStateAction } from "react";

export default function prevWeek(
    currentDate: Date,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    calendarMode: string
) {
    const newDate = new Date(currentDate);

    if (calendarMode == "weekly") {
        newDate.setDate(newDate.getDate() - 7);
    } else if (calendarMode == "monthly") {
        newDate.setMonth(newDate.getMonth() - 1);
    }

    setCurrentDate(newDate);
}