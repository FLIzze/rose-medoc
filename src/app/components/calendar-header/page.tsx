import { Dispatch, SetStateAction } from 'react';

import prevWeek from '@/app/date/prevWeek';
import nextWeek from '@/app/date/nextWeek';

interface CalendarHeaderProps {
    userName: string,
    currentYear: number,
    currentMonth: number,
    currentDay: number,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    setCurrentMonth: Dispatch<SetStateAction<number>>,
    setCurrentYear: Dispatch<SetStateAction<number>>,
    months: string[],
    setLocalMonth: Dispatch<SetStateAction<number>>,
    setCurrentDate: Dispatch<SetStateAction<Date>>,
    setLocalYear: Dispatch<SetStateAction<number>>
}

export default function CalendarHeader({ 
    userName, 
    currentYear, 
    currentMonth, 
    currentDay, 
    setCurrentDay,
    setCurrentMonth, 
    setCurrentYear, 
    months, 
    setLocalMonth, 
    setCurrentDate,
    setLocalYear }: CalendarHeaderProps) {

    const goToToday = () => {
        const today = new Date();
        setCurrentDay(today.getDate());
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setLocalMonth(today.getMonth());
        setCurrentDate(today);
        setLocalYear(today.getFullYear());
    };

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

            <p className='mr-10 font-bold text-dark-pink'>{userName}</p>
        </div>
    );
}