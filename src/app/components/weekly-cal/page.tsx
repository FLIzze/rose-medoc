'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CalEvent from "../event/page";
import { EventInterface } from '@/app/model/event';
import getEvents from '@/app/event/getEvents';
import displayEventPopUp from '@/app/event/displayEventPopUp';
import PopupEvent from '../popup-event/page';
import updateWeekDates from '@/app/date/updateWeekDates';
import EventDetails from '../event-details/page';
import displayEventDetails from '@/app/event/displayEventDetails';
import axios from 'axios';
import { UserInterface } from '@/app/model/user';
import CalendarHeader from '../calendar-header/page';
import hideEventDetails from '@/app/event/hideEventDetails';
import hideEventPopup from '@/app/event/hideEventPopup';

interface WeeklyCalProps {
    currentUser: UserInterface,
    setCurrentUser: Dispatch<SetStateAction<UserInterface>>,
    cookie: { [key: string]: string },
    own: boolean,
    tagged: boolean,
    others: boolean,
    setLocation: Dispatch<SetStateAction<string>>,
    currentDay: number,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    currentMonth: number,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    currentYear: number,
    setCurrentYear: Dispatch<SetStateAction<number>>,
    localMonth: number,
    setLocalMonth: Dispatch<SetStateAction<number>>,
    currentDate: Date,
    setCurrentDate: Dispatch<SetStateAction<Date>>
}

export default function WeeklyCal({ 
    currentUser, 
    setCurrentUser, 
    cookie, 
    own, 
    tagged, 
    others, 
    setLocation,
    currentDay,
    currentMonth,
    currentYear,
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
    setLocalMonth,
    setCurrentDate }: WeeklyCalProps) {

    const days = ["Empty", "LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    const [dates, setDates] = useState<string[]>([]);
    const [events, setEvents] = useState<EventInterface[]>([]);

    const [currentDayEvent, setCurrentDayEvent] = useState(0);
    const [currentHour, setCurrentHour] = useState(0);

    const [beginningHour, setBeginningHour] = useState(0);
    const [endHour, setEndHour] = useState(0);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [event, setEvent] = useState<EventInterface>({} as EventInterface);

    const [users, setUsers] = useState<UserInterface[]>([]);
    const [participants, setParticipants] = useState<UserInterface[]>([]);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    let skip = 1;

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((response) => {
                setUsers(response.data)
                for (const user of response.data as UserInterface[]) {
                    if (user.id == +cookie['userId']) {
                        setCurrentUser(user);
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching users', error);
            });
    }, []);

    useEffect(() => {
        getEvents(setEvents);
    }, []);

    useEffect(() => {
        updateWeekDates(currentYear, currentMonth, currentDay, setDates);
    }, [currentDay, currentMonth, currentYear]);

    function setPopUpPosition(e: React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        setPosition({ x: clientX, y: clientY });
    }

    function setCurrentEvent(event: EventInterface) {
        setEvent(event);
    }

    function decrementSkip() {
        skip--;
    }

    return (
        <div className="h-screen flex flex-col pb-6">
            <div className="flex-none">
                <PopupEvent
                    beginningHour={beginningHour}
                    endHour={endHour}
                    currentDayEvent={currentDayEvent}
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
                userName={`${currentUser.name} ${currentUser.firstName}`}
                currentYear={currentYear}
                currentMonth={currentMonth}
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                setCurrentMonth={setCurrentMonth}
                setCurrentYear={setCurrentYear}
                months={months}
                setLocalMonth={setLocalMonth}
                setCurrentDate={setCurrentDate}
            />

            <div className="flex-none grid grid-cols-8 w-full pt-6">
                {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        {day === "Empty" ? (
                            <div className="bg-white p-6"></div>
                        ) : (
                            <>
                                <p className="text-gray-600 text-xs">{day}</p>
                                <p className="text-2xl font-semibold">{dates[dayIndex]}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex-grow overflow-y-scroll">
                <div className="grid grid-cols-8 w-full">
                    {days.map((_, dayIndex) => (
                        <div key={dayIndex} className="bg-white">
                            {hours.slice(0, -1).map((hour, hoursIndex) => {
                                const eventsForHour = events.filter(event =>
                                    new Date(event.beginning).getHours() + 2 === hour &&
                                    new Date(event.beginning).getMonth() === currentMonth - 1 &&
                                    new Date(event.beginning).getDate() === Number(dates[dayIndex]) &&
                                    new Date(event.beginning).getFullYear() === currentYear
                                );

                                return (
                                    <div key={hoursIndex}>
                                        {dayIndex === 0 ? (
                                            <div className="text-xs text-right text-gray-400 pr-3 h-24">{hour}:00</div>                                        ) : (
                                            <div>
                                                {eventsForHour.length > 0 ? (
                                                    <div className="relative">
                                                        {eventsForHour
                                                            .filter(event =>
                                                                (own && currentUser.id === event.by) ||
                                                                (tagged && event.participants.includes(currentUser.id)) ||
                                                                (others && !event.participants.includes(currentUser.id) && event.by !== currentUser.id)
                                                            )
                                                            .map((event, eventIndex) => {
                                                                const eventDuration = (new Date(event.end).getTime() - new Date(event.beginning).getTime()) / (1000 * 60 * 60);
                                                                skip = eventDuration;
                                                                return (
                                                                    <div
                                                                        key={eventIndex}
                                                                        onClick={(e) => {
                                                                            hideEventPopup(setIsPopupVisible);
                                                                            displayEventDetails(setIsDetailsVisible, isDetailsVisible, isPopupVisible);
                                                                            setCurrentEvent(event);
                                                                            setPopUpPosition(e);
                                                                        }}
                                                                    >
                                                                        <CalEvent
                                                                            beginningHour={new Date(event.beginning).getHours() + 2}
                                                                            endHour={new Date(event.end).getHours() + 2}
                                                                            title={event.title}
                                                                            duration={eventDuration}
                                                                            id={event.by}
                                                                            location={event.location}
                                                                        />
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                ) : (
                                                    skip == 1 ? (
                                                        <div
                                                            id={`${dayIndex}-${hoursIndex}`}
                                                            className="bg-white border-gray-300 border-l border-t h-24"
                                                            onClick={(e) => {
                                                                hideEventDetails(setIsDetailsVisible);
                                                                displayEventPopUp(hour, dayIndex, setCurrentDayEvent, setCurrentHour, setBeginningHour, setEndHour, setTitle, setDescription, setParticipants, isPopupVisible, setIsPopupVisible, isDetailsVisible, setLocation);
                                                                setPopUpPosition(e);
                                                            }}>
                                                        </div>
                                                    ) : (
                                                        <>{decrementSkip()}</>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}