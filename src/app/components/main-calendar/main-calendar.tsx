"use client";

import { UserInterface } from "@/app/model/user"
import { Dispatch, SetStateAction, useState } from "react"
import WeeklyCal from "../weekly-cal/weekly-calendar"
import MonthlyCal from "../monthly-calendar/monthly-calendar"
import { EventInterface } from "@/app/model/event"
import PopupEvent from "../popup-event/popup-event"
import EventDetails from "../event-details/event-details"
import CalendarHeader from "../calendar-header/calendar-header";

interface MainCalProps {
    currentUser: UserInterface,
    setDate: Dispatch<SetStateAction<Date>>,
    setSidebarDate: Dispatch<SetStateAction<Date>>,
    setCalendarMode: Dispatch<SetStateAction<string>>,
    calendarMode: string,
    users: UserInterface[],
    filteredEvents: EventInterface[],
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    date: Date,
    defaultUser: UserInterface,
    setCurrentUser: Dispatch<SetStateAction<UserInterface>>
}

export default function MainCal({
    currentUser,
    setDate,
    setSidebarDate,
    setCalendarMode,
    calendarMode,
    users,
    filteredEvents,
    setEvents,
    date,
    defaultUser,
    setCurrentUser }: Readonly<MainCalProps>) {

    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [participants, setParticipants] = useState<UserInterface[]>([]);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const [event, setEvent] = useState<EventInterface>({} as EventInterface);

    const [location, setLocation] = useState("Rose Medoc");

    const [popupDate, setPopupDate] = useState(new Date());

    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    return (
        <div>
            <div className="flex-none">
                <PopupEvent
                    setEvents={setEvents}
                    pos={position}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    currentUser={currentUser}
                    users={users}
                    participants={participants}
                    setParticipants={setParticipants}
                    setIsPopupVisible={setIsPopupVisible}
                    location={location}
                    setLocation={setLocation}
                    date={date}
                    setPopupDate={setPopupDate}
                    popupDate={popupDate}
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
                setDate={setDate}
                setSidebarDate={setSidebarDate}
                setCalendarMode={setCalendarMode}
                calendarMode={calendarMode}
                currentUser={currentUser}
                date={date}
                defaultUser={defaultUser}
                setCurrentUser={setCurrentUser}
            />

            <div className="mt-6 ml-3">
                {(calendarMode === "weekly" || calendarMode === "daily") && (
                    <WeeklyCal
                        date={date}
                        hours={hours}
                        filteredEvents={filteredEvents}
                        setIsPopupVisible={setIsPopupVisible}
                        setIsDetailsVisible={setIsDetailsVisible}
                        isDetailsVisible={isDetailsVisible}
                        isPopupVisible={isPopupVisible}
                        setEvent={setEvent}
                        setPosition={setPosition}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setParticipants={setParticipants}
                        setLocation={setLocation}
                        setDate={setDate}
                        setCalendarMode={setCalendarMode}
                        viewMode={calendarMode}
                        setPopupDate={setPopupDate}
                        popupDate={popupDate}
                    />
                )}

                {calendarMode === "monthly" && (
                    <MonthlyCal
                        date={date}
                        filteredEvents={filteredEvents}
                        setIsPopupVisible={setIsPopupVisible}
                        setIsDetailsVisible={setIsDetailsVisible}
                        isDetailsVisible={isDetailsVisible}
                        isPopupVisible={isPopupVisible}
                        setEvent={setEvent}
                        setPosition={setPosition}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setParticipants={setParticipants}
                        setLocation={setLocation}
                        setDate={setDate}
                        setCalendarMode={setCalendarMode}
                        calendarMode={calendarMode}
                    />
                )}
            </div>
        </div>
    )
}