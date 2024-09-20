import { Dispatch, SetStateAction } from "react";

export default function goToDailyCalendar(newDate: Date, setDate: Dispatch<SetStateAction<Date>>, setCalendarMode: Dispatch<SetStateAction<string>>) {
    setCalendarMode("daily");
    setDate(new Date(newDate.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())));
}