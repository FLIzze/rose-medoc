import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "../model/user";
import hideEventPopup from "./hideEventPopup";

export default async function displayEventPopUp(
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>,
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    isPopupVisible: boolean,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    isDetailsVisible: boolean,
    setLocation: Dispatch<SetStateAction<string>>,
    hour: number,
    date: Date,
    setPopupDate: Dispatch<SetStateAction<Date>>,
) {
    const calendarPopup = document.getElementById("eventPopup");

    if (calendarPopup) {
        if (isPopupVisible) {
            hideEventPopup(setIsPopupVisible);
            return;
        } else if (isDetailsVisible) {
            return;
        }

        const titleInput = document.getElementById("required-title");

        if (titleInput) {
            titleInput.style.display = "none";
        }
        console.log(date);
        

        setPopupDate(new Date(date.setHours(hour, 0, 0, 0)));
        setPopupDate(new Date(date.setDate(date.getDate())))

        setParticipants([]);
        setTitle("");
        setDescription("");
        setLocation("");

        calendarPopup.style.opacity = '1';
        calendarPopup.style.pointerEvents = 'auto';
        setIsPopupVisible(true);
    }
}