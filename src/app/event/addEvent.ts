import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

import createEvent from "./createEvent";
import getEvents from "./getEvents";
import { UserInterface } from "../model/user";

export default async function addEvent(
    title: string,
    description: string,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    user: UserInterface | undefined,
    participants: UserInterface[],
    location: string,
    date: Date,
    endHour: number) {

    const titleInput = document.getElementById("required-title");

    if (titleInput) {
        if (title == "") {
            titleInput.style.display = 'block';
            return;
        } else {
            titleInput.style.display = 'none';
        }
    }

    await createEvent(title, description, user, participants, location, date, endHour);
    setEvents([]);
    getEvents(setEvents);

    const calendarPopup = document.getElementById("calendarPopup");
    if (calendarPopup) {
        calendarPopup.style.opacity = '0';
        calendarPopup.style.pointerEvents = 'none'
    }
}