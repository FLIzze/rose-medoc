import { Dispatch, SetStateAction } from "react";

export default function goToDailyCalendar(newDate: Date, setDate: Dispatch<SetStateAction<Date>>, setCalendarMode: Dispatch<SetStateAction<string>>) {
    setCalendarMode("Jour");
    setDate(new Date(newDate));
}