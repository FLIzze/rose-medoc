"use client";

import WeeklyCal from "../weekly-cal/weekly-calendar"
import MonthlyCal from "../monthly-calendar/monthly-calendar"
import PopupEvent from "../popup-event/popup-event"
import EventDetails from "../event-details/event-details"
import CalendarHeader from "../calendar-header/calendar-header";
import { useAtomValue } from "jotai";
import { calendarModeAtom } from "@/app/atom";

export default function MainCal() {

    const calendarMode = useAtomValue(calendarModeAtom);

    // const startOfWeek = new Date(date);
    // const dayOfWeek = startOfWeek.getDay();
    // const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    // startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    return (
        <div>
            <div className="flex-none">
                <PopupEvent/>

                <EventDetails/>
            </div>

            <CalendarHeader/>

            <div className="mt-6 ml-3">
                {(calendarMode === "weekly" || calendarMode === "daily") && (
                    <WeeklyCal/>
                )}

                {calendarMode === "monthly" && (
                    <MonthlyCal/>
                )}
            </div>
        </div>
    )
}