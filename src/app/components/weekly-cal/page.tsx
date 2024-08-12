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
    let skip = false;
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

    const [begginingHour, setBegginingHour] = useState(0);
    const [endHour, setEndHour] = useState(0);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        checkEvents(setEvents);
    }, []);

    useEffect(() => {
        updateWeekDates(currentYear, currentMonth, currentDay, setDates);
    }, [currentDay, currentMonth, currentYear]);

    function setPopUpPosition(e: React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        console.log("Mouse position:", clientX, clientY);
        setPosition({ x: clientX, y: clientY });
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
                    begginingHour={begginingHour}
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
                />

                <p className='font-bold ml-52 pl-1'>{months[currentMonth]} {currentYear}</p>
            </div>

            <div className="flex-none grid grid-cols-8 w-full pt-6">
                {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        {day === "Empty" ? (
                            <>
                                <div className="bg-white p-6"></div>
                            </>
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
                            {hours.map((hour, hoursIndex) => (
                                <div key={hoursIndex}>
                                    {skip = false}
                                    {dayIndex === 0 ? (
                                        <div className="text-right text-gray-400 text-xs pt-1 pb-16 mb-1 pr-3">{hour}:00</div>
                                    ) : (
                                        <div>
                                            {events.map((event, eventIndex) => (
                                                <div key={eventIndex}>
                                                    {new Date(event.beginning).getHours() + 2 == hour
                                                        && new Date(event.beginning).getMonth() == currentMonth - 1
                                                        && new Date(event.beginning).getDate() == Number(dates[dayIndex])
                                                        && new Date(event.beginning).getFullYear() == currentYear ? (
                                                        <>
                                                            <CalEvent hour={hour} title={event.title} color='blue' />
                                                            {skip = true}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {eventIndex == events.length - 1 && (
                                                                <>
                                                                    {!skip && (
                                                                        <div
                                                                            className={`bg-white border-gray-300 border-l border-t h-20 mb-2`}
                                                                            onClick={(e) => {
                                                                                setPopUpPosition(e);
                                                                                displayMeetingPopUp(hoursIndex, dayIndex, setCurrentDayMeeting, setCurrentHour, setBegginingHour, setEndHour);
                                                                            }}>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}