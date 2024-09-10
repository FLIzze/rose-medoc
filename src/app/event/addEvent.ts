import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

import createEvent from "./createEvent";
import getEvents from "./getEvents";
import { UserInterface } from "../model/user";

export default async function addEvent(
    dates: string[],
    currentDayMeeting: number,
    begginingHour: number,
    endHour: number,
    currentMonth: number,
    currentYear: number,
    title: string,
    description: string,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    user: UserInterface | undefined,
    participants: UserInterface[],
    location: string) {

    const titleInput = document.getElementById("required-title");
    
    if (title == "") {
        if (titleInput) {
            titleInput.style.display = 'block';
        }
        return;
    } else {
        if (titleInput) {
            titleInput.style.display = 'none';
        }
    }

    await createEvent(dates[currentDayMeeting], begginingHour, endHour, currentMonth, currentYear, title, description, user, participants, location);
    setEvents([]);
    getEvents(setEvents);

    const calendarPopup = document.getElementById("calendarPopup");
    if (calendarPopup) {
        calendarPopup.style.opacity = '0';
        calendarPopup.style.pointerEvents = 'none'
    }
}