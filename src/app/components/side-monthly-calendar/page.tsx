"use client";

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { EventInterface } from '@/app/model/event';

interface SideMonthlyCalProps {
    sidebarDate: Date,
    setSidebarDate: Dispatch<SetStateAction<Date>>,
    setDate: Dispatch<SetStateAction<Date>>,
    own: boolean,
    tagged: boolean,
    others: boolean,
    filteredEvents: EventInterface[],
}

export default function SideMonthlyCal({
    sidebarDate,
    setSidebarDate,
    setDate,
    filteredEvents }: SideMonthlyCalProps) {

    const currentMonthCal = sidebarDate.getMonth();
    const currentYearCal = sidebarDate.getFullYear();

    const daysInMonth = new Date(currentYearCal, currentMonthCal + 1, 0).getDate();
    const firstDayOfMonth = (new Date(currentYearCal, currentMonthCal, 1).getDay() + 6) % 7;

    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(new Date(currentYearCal, currentMonthCal, day));
    }

    const handlePreviousMonth = () => {
        setSidebarDate(new Date(sidebarDate.getFullYear(), sidebarDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setSidebarDate(new Date(sidebarDate.getFullYear(), sidebarDate.getMonth() + 1, 1));
    };

    const setDateFunc = (date: Date) => {
        const dayOfWeek = date.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        const mondayDate = new Date(date);
        mondayDate.setDate(date.getDate() + diffToMonday);

        setDate(mondayDate);
    };

    const monthName = sidebarDate.toLocaleString('fr-FR', { month: 'long' });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const daysOfWeek = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(sidebarDate);
        date.setDate(sidebarDate.getDate() - sidebarDate.getDay() + index + 1);
        return date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase().charAt(0);
    });

    return (
        <div className='pb-6'>
            <div className="flex justify-between items-center pl-2 text-sm font-bold">
                <h2 className='w-full text-dark-pink'>{capitalizedMonthName} {currentYearCal}</h2>
                <button onClick={handlePreviousMonth}>
                    <img
                        src="left_arrow.png"
                        alt="prev mois"
                        className='w-5 h-5 mr-3 bg-medium-pink hover:bg-dark-pink p-1 rounded-full'
                    />
                </button>
                <button onClick={handleNextMonth}>
                    <img
                        src="right_arrow.png"
                        alt="next mois"
                        className='w-5 h-5 mr-6 bg-medium-pink hover:bg-dark-pink p-1 rounded-full'
                    />
                </button>
            </div>

            <div className="grid grid-cols-7 text-sm">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="p-1 text-center font-bold">
                        <p className='text-xs text-dark-pink'>
                            {day}
                        </p>
                    </div>
                ))}

                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={index} className="p-1 text-center"></div>
                ))}

                {daysArray.map((date, index) => {
                    const hasEvents = filteredEvents.some(event => {
                        const eventDate = new Date(event.beginning);
                        return eventDate.getDate() === date.getDate() &&
                            eventDate.getMonth() === date.getMonth() &&
                            eventDate.getFullYear() === date.getFullYear();
                    });

                    return (
                        <button
                            key={index}
                            onClick={() => setDateFunc(date)}
                        >
                            <p className={`p-2 text-xs rounded-full transition-all ${hasEvents ? 'text-white bg-medium-pink hover:bg-dark-pink' : 'text-medium-pink hover:bg-very-light-pink'}`}>
                                {date.getDate()}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}