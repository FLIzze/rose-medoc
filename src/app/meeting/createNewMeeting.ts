import { Dispatch, SetStateAction } from "react";
import { EventInterface } from "../model/event";

import createEvent from "../event";
import checkEvents from "../checkEvents";

export default async function createNewMeeting(
    dates: string[],
    currentDayMeeting: number,
    begginingHour: number,
    endHour: number, 
    currentMonth: number,
    currentYear: number,
    title: string,
    description: string,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>) {

    await createEvent(dates[currentDayMeeting], begginingHour, endHour, currentMonth, currentYear, title, description);
    setEvents([]);
    checkEvents(setEvents);

    const calendarPopup = document.getElementById("calendarPopup");
    if (calendarPopup) {
        calendarPopup.style.opacity = '0';
        calendarPopup.style.pointerEvents = 'none'
    }
}