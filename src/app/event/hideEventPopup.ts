import { Dispatch, SetStateAction } from "react";

export default function hideEventPopup(setIsPopupVisible: Dispatch<SetStateAction<boolean>>) {
    const eventPopup = document.getElementById("eventPopup");

    if (eventPopup) {
        eventPopup.style.opacity = '0';
        eventPopup.style.pointerEvents = 'none'
        setIsPopupVisible(false);
    }
}