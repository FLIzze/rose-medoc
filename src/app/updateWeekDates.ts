import { Dispatch, SetStateAction } from "react";

export default function updateWeekDates(currentYear: number, currentMonth: number, currentDay: number, setDates: Dispatch<SetStateAction<string[]>>) {
    const newDates = ["Empty"];
    const currentDate = new Date(currentYear, currentMonth, currentDay);
    const currentDayOfWeek = currentDate.getDay();
    for (let i = 1; i <= 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - currentDayOfWeek + i);
        newDates.push(date.getDate().toString());
    }
    setDates(newDates);
}