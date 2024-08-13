'use client';

import { useState, useEffect } from 'react';
import CalEvent from "../event/page";
import { EventInterface } from '@/app/model/event';
import checkEvents from '@/app/checkEvents';
import displayMeetingPopUp from '@/app/meeting/displayMeetingPopUp';
import PoopupMeeting from '../popup-meeting/page';
import prevWeek from '@/app/date/prevWeek';
import nextWeek from '@/app/date/nextWeek';
import updateWeekDates from '@/app/date/updateWeekDates';

export default function WeeklyCal() {
    const days = ["Empty", "LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [dates, setDates] = useState<string[]>([]);
    const [events, setEvents] = useState<EventInterface[]>([]);

    const [currentDayMeeting, setCurrentDayMeeting] = useState(0);
    const [currentHour, setCurrentHour] = useState(0);

    const [beginningHour, setBeginningHour] = useState(0);
    const [endHour, setEndHour] = useState(0);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    let skip = 1;

    useEffect(() => {
        checkEvents(setEvents);
    }, []);

    useEffect(() => {
        updateWeekDates(currentYear, currentMonth, currentDay, setDates);
    }, [currentDay, currentMonth, currentYear]);

    function setPopUpPosition(e: React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        setPosition({ x: clientX, y: clientY });
    }

    function decrementSkip() {
        skip--;
    }

    return (
        <div className="h-screen flex flex-col pb-6">
            <div className="flex-none">
                <button
                    className="mr-3 ml-52 pl-1"
                    onClick={() => prevWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                    PREV WEEK
                </button>
                <button
                    className="mr-3"
                    onClick={() => nextWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                    NEXT WEEK
                </button>

                <PoopupMeeting
                    beginningHour={beginningHour}
                    endHour={endHour}
                    currentDayMeeting={currentDayMeeting}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    currentHour={currentHour}
                    days={days}
                    dates={dates}
                    months={months}
                    hours={hours}
                    setEvents={setEvents}
                    posX={position.x}
                    posY={position.y}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    setBeginningHour={setBeginningHour}
                    setEndHour={setEndHour}
                />

                <p className='font-bold ml-52 pl-1'>{months[currentMonth]} {currentYear}</p>
            </div>

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
                    {days.map((day, dayIndex) => (
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
                                            <div className="text-right text-gray-400 text-xs pr-3 h-24">{hour}:00</div>
                                        ) : (
                                            <div>
                                                {eventsForHour.length > 0 ? (
                                                    eventsForHour.map((event, eventIndex) => {
                                                        const eventDuration = (new Date(event.end).getTime() - new Date(event.beginning).getTime()) / (1000 * 60 * 60);
                                                        skip = eventDuration
                                                        return (
                                                            <div key={eventIndex}>
                                                                <CalEvent
                                                                    beginningHour={new Date(event.beginning).getHours() + 2}
                                                                    endHour={new Date(event.end).getHours() + 2}
                                                                    title={event.title}
                                                                    color='blue'
                                                                    duration={eventDuration}
                                                                />
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    skip == 1 ? (
                                                        <div>
                                                            {dates[dayIndex] == currentDay.toString() ? (
                                                                <div
                                                                    className="bg-gray-100 border-gray-300 border-l border-t h-24"
                                                                    onClick={(e) => {
                                                                        setPopUpPosition(e);
                                                                        displayMeetingPopUp(hour, dayIndex, setCurrentDayMeeting, setCurrentHour, setBeginningHour, setEndHour, setTitle, setDescription);
                                                                    }}>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="bg-white border-gray-300 border-l border-t h-24"
                                                                    onClick={(e) => {
                                                                        setPopUpPosition(e);
                                                                        displayMeetingPopUp(hour, dayIndex, setCurrentDayMeeting, setCurrentHour, setBeginningHour, setEndHour, setTitle, setDescription);
                                                                    }}>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {decrementSkip()}
                                                        </>
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