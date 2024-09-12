import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "../model/user";
import hideEventPopup from "./hideEventPopup";

export default async function displayEventPopUp(
    hour: number,
    day: number,
    setCurrentDayEvent: Dispatch<SetStateAction<number>>,
    setCurrentHour: Dispatch<SetStateAction<number>>,
    setBegginingHour: Dispatch<SetStateAction<number>>,
    setEndHour: Dispatch<SetStateAction<number>>,
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>,
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    isPopupVisible: boolean,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>) {

    const calendarPopup = document.getElementById("eventPopup");

    if (calendarPopup) {
        if (isPopupVisible) {
            hideEventPopup(setIsPopupVisible);
            return;
        }

        const titleInput = document.getElementById("required-title");

        if (titleInput) {
            titleInput.style.display = "none";
        }

        setCurrentDayEvent(day);
        setCurrentHour(hour);
        setBegginingHour(hour);
        setEndHour(hour + 1);
        setParticipants([]);
        setTitle("");
        setDescription("");

        calendarPopup.style.opacity = '1';
        calendarPopup.style.pointerEvents = 'auto';
        setIsPopupVisible(true);
    }
}