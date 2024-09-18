"use client";

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { EventInterface } from '@/app/model/event';

interface SideMonthlyCalProps {
    setCurrentDay: Dispatch<SetStateAction<number>>,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    setCurrentYear: Dispatch<SetStateAction<number>>,
    localMonth: number,
    setLocalMonth: Dispatch<SetStateAction<number>>,
    currentDate: Date,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    localYear: number,
    setLocalYear: Dispatch<SetStateAction<number>>,
    own: boolean,
    tagged: boolean,
    others: boolean,
    filteredEvents: EventInterface[]
}

export default function SideMonthlyCal({
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
    localMonth,
    setLocalMonth,
    currentDate,
    setCurrentDate,
    localYear,
    setLocalYear,
    filteredEvents }: SideMonthlyCalProps) {


    useEffect(() => {
        setCurrentDate(new Date(localYear, localMonth));
    }, [localMonth, localYear]);


    const currentMonthCal = currentDate.getMonth();
    const currentYearCal = currentDate.getFullYear();

    const daysInMonth = new Date(currentYearCal, currentMonthCal + 1, 0).getDate();
    const firstDayOfMonth = (new Date(currentYearCal, currentMonthCal, 1).getDay() + 6) % 7;

    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(new Date(currentYearCal, currentMonthCal, day));
    }

    const handlePreviousMonth = () => {
        if (localMonth === 0) {
            setLocalMonth(11);
            setLocalYear(localYear - 1);
        } else {
            setLocalMonth(localMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (localMonth === 11) {
            setLocalMonth(0);
            setLocalYear(localYear + 1);
        } else {
            setLocalMonth(localMonth + 1);
        }
    };

    const setDate = (date: Date) => {
        setCurrentDay(date.getDate());
        setCurrentMonth(date.getMonth());
        setCurrentYear(date.getFullYear());
    };

    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return (
        <div className='pb-6'>
            <div className="flex justify-between items-center pl-2 text-sm font-bold">
                <h2 className='w-32 text-dark-pink'>{capitalizedMonthName} {currentYearCal}</h2>
                <button onClick={handlePreviousMonth}>
                    <img
                        src="left_arrow.png"
                        alt="prev mois"
                        className='w-5 h-5 bg-medium-pink hover:bg-dark-pink p-1 rounded-full'
                    />
                </button>
                <button onClick={handleNextMonth}>
                    <img
                        src="right_arrow.png"
                        alt="next mois"
                        className='w-5 h-5 bg-medium-pink hover:bg-dark-pink p-1 rounded-full'
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
                            eventDate.getMonth() === date.getMonth()-1 &&
                            eventDate.getFullYear() === date.getFullYear();
                    });

                    return (
                        <button
                            key={index}
                            onClick={() => setDate(date)}
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