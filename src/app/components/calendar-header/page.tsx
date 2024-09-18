import { Dispatch, SetStateAction, useState } from 'react';

import prevWeek from '@/app/date/prevWeek';
import nextWeek from '@/app/date/nextWeek';
import hideCalendarMode from '@/app/event/hideCalendarMode';
import displayCalendarMode from '@/app/event/displayCalendarMode';
import { UserInterface } from '@/app/model/user';

interface CalendarHeaderProps {
    currentYear: number,
    currentMonth: number,
    currentDay: number,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    setCurrentYear: Dispatch<SetStateAction<number>>,
    months: string[],
    setLocalMonth: Dispatch<SetStateAction<number>>,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    setLocalYear: Dispatch<SetStateAction<number>>,
    setCalendarMode: Dispatch<SetStateAction<string>>,
    calendarMode: string,
    currentUser: UserInterface,
    setOwn: Dispatch<SetStateAction<boolean>>,
    setTagged: Dispatch<SetStateAction<boolean>>,
    setOthers: Dispatch<SetStateAction<boolean>>,
}

export default function CalendarHeader({
    currentYear,
    currentMonth,
    currentDay,
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
    months,
    setLocalMonth,
    setCurrentDate,
    setLocalYear,
    setCalendarMode,
    calendarMode,
    currentUser,
    setOwn,
    setTagged,
    setOthers }: CalendarHeaderProps) {

    const [isCalendarModeVisible, setIsCalendarModeVisible] = useState(false);

    function goToToday() {
        const today = new Date();
        setCurrentDay(today.getDate());
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setLocalMonth(today.getMonth());
        setCurrentDate(today);
        setLocalYear(today.getFullYear());
        setOwn(true);
        setTagged(true);
        setOthers(false);
    };

    function setCalendar(mode: string) {
        setCalendarMode(mode);
        hideCalendarMode(setIsCalendarModeVisible);
    }

    return (
        <div className='flex ml-52 justify-between items-center'>
            <div className='flex items-center'>
                <div className='flex'>
                    <button
                        className="mr-3"
                        onClick={goToToday}>
                        <img
                            src="/home.png"
                            alt="home"
                            className='w-9 h-9 bg-medium-pink hover:bg-dark-pink transition-all p-2 rounded-full'
                        />
                    </button>
                    <button
                        className="mr-3"
                        onClick={() => prevWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                        <img
                            src="left_arrow.png"
                            alt="prev Week"
                            className='w-9 h-9 bg-medium-pink hover:bg-dark-pink transition-all p-2 rounded-full'
                        />
                    </button>
                    <button
                        className="mr-3"
                        onClick={() => nextWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                        <img
                            src="right_arrow.png"
                            alt="next Week"
                            className='w-9 h-9 bg-medium-pink hover:bg-dark-pink transition-all p-2 rounded-full'
                        />
                    </button>
                </div>

                <p className='font-bold text-dark-pink'>{months[currentMonth]} {currentYear}</p>

            </div>

            <div className='flex justify-end items-center'>
                <div>
                    <button
                        className='mr-5 text-white bg-medium-pink px-3 py-2 rounded-full transition-all hover:bg-dark-pink flex items-center text-sm w-32'
                        onClick={() => displayCalendarMode(setIsCalendarModeVisible, isCalendarModeVisible)}
                    >
                        {calendarMode}
                        <img
                            src="down_arrow.png"
                            alt="derouler"
                            className='w-3 h-3 ml-4 mr-2'
                        />
                    </button>

                    <div
                        className='absolute text-sm flex flex-col bg-medium-pink rounded-lg shadow-2xl items-start pl-2 py-3 text-white mt-2 pr-4 opacity-0 pointer-events-none'
                        id='calMode'
                    >
                        <button
                            onClick={() => setCalendar('weekly')}
                            className='hover:bg-dark-pink w-full rounded-lg text-left pl-3 transition-all h-9 pr-32'
                        >
                            Semaine
                        </button>
                        <button
                            onClick={() => setCalendar('monthly')}
                            className='hover:bg-dark-pink w-full rounded-lg text-left pl-3 transition-all h-9 pr-32'
                        >
                            Mois
                        </button>
                    </div>
                </div>
                <p className='mr-10 font-bold text-dark-pink'>{currentUser.firstName} {currentUser.name}</p>
            </div>
        </div>
    );
}