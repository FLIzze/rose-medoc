import createEvent from "../event";
import checkEvents from "../checkEvents";

export default async function createNewMeeting(dates: string[], hours: number[], currentDayMeeting: number, currentHour: number, currentMonth: number, currentYear: number, title: string, description: string, setEvents: any) {
    await createEvent(dates[currentDayMeeting], hours[currentHour], currentMonth, currentYear, title, description);
    setEvents([]);
    checkEvents(setEvents);
}