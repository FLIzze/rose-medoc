import { Dispatch, SetStateAction } from "react";
import { Atom } from "jotai"; // Assuming SetAtom is from the 'jotai' library

type SetAtom<T> = Dispatch<SetStateAction<T>>;

export default function goToDailyCalendar(newDate: Date, setDate: SetAtom<Date>, setCalendarMode: SetAtom<string>) {
    setCalendarMode("daily");
    setDate(new Date(newDate));
}