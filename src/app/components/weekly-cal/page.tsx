'use client';

import { useState, useEffect } from 'react';
import CalEvent from "../event/page";
import { EventInterface } from '@/app/model/event';
import checkEvents from '@/app/checkEvents';
import displayMeetingPopUp from '@/app/meeting/meetingSetHour';
import PoopupMeeting from '../popup-meeting/page';
import prevWeek from '@/app/date/prevWeek';
import nextWeek from '@/app/date/nextWeek';
import updateWeekDates from '@/app/date/updateWeekDates';

export default function WeeklyCal() {
    let skip = false;
    const days = ["Empty", "LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
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

    useEffect(() => {
        checkEvents(setEvents);
    }, []);

    useEffect(() => {
        updateWeekDates(currentYear, currentMonth, currentDay, setDates);
    }, [currentDay, currentMonth, currentYear]);

    return (
        <div>
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
            />

            <p className='font-bold ml-52 pl-1'>{months[currentMonth]} {currentYear}</p>
            <div className="grid grid-cols-8 w-full pt-6 grid-rows-10 overflow-hidden">
                {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        {day === "Empty" ? (
                            <div>
                                <div className="bg-white p-6"></div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600 text-xs">{day}</p>
                                <p className="text-2xl font-semibold">{dates[dayIndex]}</p>
                            </div>
                        )}
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
                                                    <div>
                                                        <CalEvent hour={hour} title={event.title} color='blue' />
                                                        {skip = true}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {eventIndex == events.length - 1 && (
                                                            <div>
                                                                {!skip && (
                                                                    <div className={`bg-white border-gray-300 border-l border-t h-20 mb-2 $`} onClick={() => displayMeetingPopUp(hoursIndex, dayIndex, setCurrentDayMeeting, setCurrentHour, setBegginingHour, setEndHour)}></div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
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
    );
}
