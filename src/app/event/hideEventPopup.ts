import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

import createEvent from "./createEvent";
import getEvents from "./getEvents";
import { UserInterface } from "../model/user";

export default async function hidePopupEvent(
    dates: string[],
    currentDayMeeting: number,
    begginingHour: number,
    endHour: number,
    currentMonth: number,
    currentYear: number,
    title: string,
    description: string,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    user: UserInterface | undefined) {

    await createEvent(dates[currentDayMeeting], begginingHour, endHour, currentMonth, currentYear, title, description, user);
    setEvents([]);
    getEvents(setEvents);

    const calendarPopup = document.getElementById("calendarPopup");
    if (calendarPopup) {
        calendarPopup.style.opacity = '0';
        calendarPopup.style.pointerEvents = 'none'
    }
}