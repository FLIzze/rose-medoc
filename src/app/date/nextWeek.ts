import { Dispatch, SetStateAction } from "react";

export default function nextWeek(currentYear: number, currentMonth: number, currentDay: number, setCurrentDay: Dispatch<SetStateAction<number>>, setCurrentMonth: Dispatch<SetStateAction<number>>, setCurrentYear: Dispatch<SetStateAction<number>>) {
    const newDate = new Date(currentYear, currentMonth, currentDay);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDay(newDate.getDate());
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
}