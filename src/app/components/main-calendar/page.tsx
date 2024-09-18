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
    setDate: Dispatch<SetStateAction<Date>>,
    setSidebarDate: Dispatch<SetStateAction<Date>>,
    setCalendarMode: Dispatch<SetStateAction<string>>,
    calendarMode: string,
    users: UserInterface[],
    filteredEvents: EventInterface[],
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    setOwn: Dispatch<SetStateAction<boolean>>,
    setTagged: Dispatch<SetStateAction<boolean>>,
    setOthers: Dispatch<SetStateAction<boolean>>,
    date: Date,
    eventPopUpDate: Date,
    setEventPopUpDate: Dispatch<SetStateAction<Date>>
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
    setOwn,
    setTagged,
    setOthers,
    date,
    eventPopUpDate,
    setEventPopUpDate }: MainCalProps) {

    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    const days = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

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
                    eventPopUpDate={eventPopUpDate}
                    months={months}
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
                months={months}
                setDate={setDate}
                setSidebarDate={setSidebarDate}
                setCalendarMode={setCalendarMode}
                calendarMode={calendarMode}
                currentUser={currentUser}
                setOwn={setOwn}
                setTagged={setTagged}
                setOthers={setOthers}
                date={date}
            />

            {calendarMode == 'weekly' && (
                <WeeklyCal
                    date={date}
                    days={days}
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
                    eventPopUpDate={eventPopUpDate}
                    setEventPopUpDate={setEventPopUpDate}
                />
            )}

            {calendarMode == 'monthly' && (
                <MonthlyCal
                    date={date}
                />
            )}
        </div>
    )
}