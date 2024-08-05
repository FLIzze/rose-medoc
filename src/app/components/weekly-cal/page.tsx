'use client';

import { useState } from 'react';
import CalEvent from "../event/page";

export default function WeeklyCal() {
    const days = ["Empty", "LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    const [currentDate, setCurrentDate] = useState(new Date());

    const currentDay = currentDate.getDay();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dates = ["Empty"];
    const monthSet = new Set();
    const yearSet = new Set();
    for (let i = 1; i <= 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - currentDay + i);
        dates.push(date.getDate().toString());
        monthSet.add(date.getMonth());
        yearSet.add(date.getFullYear());
    }

    function nextWeek() {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    }

    function prevWeek() {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    }

    function newMeeting(hour: number, day: number) {
        const meetingDate = new Date(currentDate);
        meetingDate.setDate(currentDate.getDate() - currentDay + day);
        const meetingMonth = meetingDate.getMonth();
        const meetingYear = meetingDate.getFullYear();
        alert(`${days[day]} ${dates[day]} ${hours[hour]} ${months[meetingMonth]} ${meetingYear}`);
    }

    const displayMonths = Array.from(monthSet).map(month => months[month]).join(' - ');
    const displayYears = Array.from(yearSet).join(' - ');

    return (
        <div>
            <button className="mr-3" onClick={prevWeek}>PREV WEEK</button>
            <button className="mr-3" onClick={nextWeek}>NEXT WEEK</button>
            <p>{displayMonths} {displayYears}</p>
            <div className="grid grid-cols-8 w-full pt-6">
                {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        {day == "Empty" ? (
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
                                {dayIndex == 0 ? (
                                    <div className="text-right text-gray-400 text-xs pt-1 pb-16 mb-1 pr-3">{hour}</div>
                                ) : (
                                    <div onClick={() => newMeeting(Number(hoursIndex), dayIndex)}>
                                        <div className="bg-white">
                                            <div className="bg-white p-11 border-l border-t border-gray-300"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}