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

    return (
        <div>
            <div className="flex-none">
                <PopupEvent/>

                <EventDetails/>
            </div>

            <CalendarHeader/>

            <div className="mt-6 ml-3">
                {(calendarMode === "Semaine" || calendarMode === "Jour") && (
                    <WeeklyCal/>
                )}

                {calendarMode === "Mois" && (
                    <MonthlyCal/>
                )}
            </div>
        </div>
    )
}