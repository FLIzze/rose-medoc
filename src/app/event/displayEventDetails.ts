import { Dispatch, SetStateAction } from "react";
import hideEventDetails from "./hideEventDetails";

export default function displayEventDetails(setIsDetailsVisible: Dispatch<SetStateAction<boolean>>, isDetailsVisible: boolean, isPopupVisible: boolean) {
    const popup = document.getElementById("eventDetails");

    if (popup) {
        if (isDetailsVisible) {
            hideEventDetails(setIsDetailsVisible);
            return;
        } else if (isPopupVisible) {
            return;
        }

        popup.style.opacity = '1';
        popup.style.pointerEvents = 'auto';
        setIsDetailsVisible(true);
    }
}