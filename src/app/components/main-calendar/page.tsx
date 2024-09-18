"use client";

import { UserInterface } from "@/app/model/user"
import { Dispatch, SetStateAction, useState } from "react"
import WeeklyCal from "../weekly-cal/page"
import CalendarHeader from "../calendar-header/page"
import MonthlyCal from "../monthly-calendar/page"
import { EventInterface } from "@/app/model/event"
import PopupEvent from "../popup-event/page"
import EventDetails from "../event-details/page"

interface MainCalProps {
    currentUser: UserInterface,
    currentDay: number,
    currentMonth: number,
    currentYear: number,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    setCurrentYear: Dispatch<SetStateAction<number>>,
    setLocalMonth: Dispatch<SetStateAction<number>>,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    setLocalYear: Dispatch<SetStateAction<number>>,
    setCalendarMode: Dispatch<SetStateAction<string>>,
    calendarMode: string,
    users: UserInterface[],
    filteredEvents: EventInterface[],
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    setOwn: Dispatch<SetStateAction<boolean>>,
    setTagged: Dispatch<SetStateAction<boolean>>,
    setOthers: Dispatch<SetStateAction<boolean>>
}

export default function MainCal({
    currentUser,
    currentDay,
    currentMonth,
    currentYear,
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
    setLocalMonth,
    setCurrentDate,
    setLocalYear,
    setCalendarMode,
    calendarMode,
    users,
    filteredEvents,
    setEvents,
    setOwn,
    setTagged,
    setOthers }: MainCalProps) {

    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    const [beginningHour, setBeginningHour] = useState(0);
    const [endHour, setEndHour] = useState(0);

    const [currentDayEvent, setCurrentDayEvent] = useState(0);
    const [currentMonthEvent, setCurrentMonthEvent] = useState(0);
    const [currentHour, setCurrentHour] = useState(0);


    const days = ["Empty", "LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    const [dates, setDates] = useState<string[]>([]);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [participants, setParticipants] = useState<UserInterface[]>([]);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const [event, setEvent] = useState<EventInterface>({} as EventInterface);

    const [location, setLocation] = useState("Rose Medoc");

    return (
        <div>
            <div className="flex-none">
                <PopupEvent
                    beginningHour={beginningHour}
                    endHour={endHour}
                    currentDayEvent={currentDayEvent}
                    currentMonthEvent={currentMonthEvent}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    days={days}
                    dates={dates}
                    months={months}
                    hours={hours}
                    setEvents={setEvents}
                    pos={position}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    setBeginningHour={setBeginningHour}
                    setEndHour={setEndHour}
                    currentUser={currentUser}
                    users={users}
                    participants={participants}
                    setParticipants={setParticipants}
                    setIsPopupVisible={setIsPopupVisible}
                    location={location}
                    setLocation={setLocation}
                />

                <EventDetails
                    event={event}
                    setEvents={setEvents}
                    pos={position}
                    currentUser={currentUser}
                    users={users}
                    setIsDetailsVisible={setIsDetailsVisible}
                />
            </div>

            <CalendarHeader
                currentYear={currentYear}
                currentMonth={currentMonth}
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                setCurrentMonth={setCurrentMonth}
                setCurrentYear={setCurrentYear}
                months={months}
                setLocalMonth={setLocalMonth}
                setCurrentDate={setCurrentDate}
                setLocalYear={setLocalYear}
                setCalendarMode={setCalendarMode}
                calendarMode={calendarMode}
                currentUser={currentUser}
                setOwn={setOwn}
                setTagged={setTagged}
                setOthers={setOthers}
            />

            {calendarMode == 'weekly' && (
                <WeeklyCal
                    days={days}
                    hours={hours}
                    dates={dates}
                    filteredEvents={filteredEvents}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    setIsPopupVisible={setIsPopupVisible}
                    setIsDetailsVisible={setIsDetailsVisible}
                    isDetailsVisible={isDetailsVisible}
                    isPopupVisible={isPopupVisible}
                    setEvent={setEvent}
                    setPosition={setPosition}
                    setCurrentDayEvent={setCurrentDayEvent}
                    setCurrentHour={setCurrentHour}
                    setBeginningHour={setBeginningHour}
                    setEndHour={setEndHour}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setParticipants={setParticipants}
                    setLocation={setLocation}
                    currentDay={currentDay}
                    setDates={setDates}
                />
            )}

            {calendarMode == 'monthly' && (
                <MonthlyCal />
            )}
        </div>
    )
}