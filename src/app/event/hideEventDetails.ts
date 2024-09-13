import { Dispatch, SetStateAction } from "react";

export default function hideEventDetails(setIsDetailsVisible: Dispatch<SetStateAction<boolean>>) {
    const popup = document.getElementById("eventDetails");

    if (popup) {
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'none';
        setIsDetailsVisible(false);
    }
}