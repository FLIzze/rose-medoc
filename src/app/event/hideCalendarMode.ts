import { Dispatch, SetStateAction } from "react";

export default function hideCalendarMode(setIsCalendarModeVisible: Dispatch<SetStateAction<boolean>>) {
    const calMode = document.getElementById("calMode");

    if (calMode) {
        calMode.style.opacity = '0';
        calMode.style.pointerEvents = 'none';
        setIsCalendarModeVisible(false);
    }
}