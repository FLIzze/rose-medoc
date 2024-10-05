import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

import createEvent from "./createEvent";
import getEvents from "./getEvents";
import { UserInterface } from "../model/user";
import hideEventPopup from "./hideEventPopup";

export default async function addEvent(
    title: string,
    description: string,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    user: UserInterface | undefined,
    participants: UserInterface[],
    location: string,
    popupDate: Date,
    endHour: number,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>) {

    const titleInput = document.getElementById("required-title");

    if (titleInput) {
        if (title == "") {
            titleInput.style.display = 'block';
            return;
        } else {
            hideEventPopup(setIsPopupVisible)
            titleInput.style.display = 'none';
        }
    }

    await createEvent(title, description, user, participants, location, popupDate, endHour);
    setEvents([]);
    getEvents(setEvents);


    const calendarPopup = document.getElementById("calendarPopup");
    if (calendarPopup) {
        calendarPopup.style.opacity = '0';
        calendarPopup.style.pointerEvents = 'none'
    }
}