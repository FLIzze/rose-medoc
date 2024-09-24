"use client";

import { UserInterface } from "@/app/model/user"
import { Dispatch, SetStateAction, useState } from "react"
import WeeklyCal from "../weekly-cal/page"
import CalendarHeader from "../calendar-header/page"
import MonthlyCal from "../monthly-calendar/page"
import { EventInterface } from "@/app/model/event"
import PopupEvent from "../popup-event/page"
import EventDetails from "../event-details/page"
import DailyCal from "../daily-calendar/page";

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
    date }: MainCalProps) {

    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [participants, setParticipants] = useState<UserInterface[]>([]);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const [event, setEvent] = useState<EventInterface>({} as EventInterface);

    const [location, setLocation] = useState("Rose Medoc");

    // Calculate the start of the week (Monday)
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
                    setDate={setDate}
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
            />

            <div className="mt-6 ml-3">
                {calendarMode == 'weekly' && (
                    <WeeklyCal
                        date={startOfWeek}
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
                    />
                )}

                {calendarMode == 'monthly' && (
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

                {calendarMode == 'daily' && (
                    <DailyCal
                        date={date}
                        filteredEvents={filteredEvents}
                        setPosition={setPosition}
                        setIsPopupVisible={setIsPopupVisible}
                        setIsDetailsVisible={setIsDetailsVisible}
                        isPopupVisible={isPopupVisible}
                        isDetailsVisible={isDetailsVisible}
                        setEvent={setEvent}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setParticipants={setParticipants}
                        setLocation={setLocation}
                        setDate={setDate}
                        />
                )}
            </div>
        </div>
    )
}