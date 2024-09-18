import { Dispatch, SetStateAction } from "react";
import hideCalendarMode from "./hideCalendarMode";

export default function displayCalendarMode(setIsCalendarModeVisible: Dispatch<SetStateAction<boolean>>, isCalendarModeVisible: boolean) {
    const calMode = document.getElementById("calMode");

    if (calMode) {
        if (isCalendarModeVisible) {
            hideCalendarMode(setIsCalendarModeVisible);
            return;
        }

        calMode.style.opacity = '1';
        calMode.style.pointerEvents = 'auto';
        setIsCalendarModeVisible(true);
    }
}