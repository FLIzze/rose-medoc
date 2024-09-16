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
    setCurrentDate: Dispatch<SetStateAction<Date>>
}

export default function CalendarHeader({ userName, currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear, months, setLocalMonth, setCurrentDate }: CalendarHeaderProps) {
    const goToToday = () => {
        const today = new Date();
        setCurrentDay(today.getDate());
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setLocalMonth(today.getMonth());
        setCurrentDate(today);
    };

    return (
        <div className='flex ml-52 justify-between'>
            <div className='flex'>
                <div className='flex'>
                    <button
                        className="mr-3"
                        onClick={goToToday}>
                        <p className='border border-gray-300 py-1 px-3 rounded-sm hover:bg-gray-100 transition-all text-sm'>Aujourd'hui</p>
                    </button>
                    <button
                        className="mr-3"
                        onClick={() => prevWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                        <img
                            src="right_arrow_nav.png"
                            alt="prev Week"
                            className='w-8 h-8 hover:bg-gray-200 p-2 rounded-full'
                        />
                    </button>
                    <button
                        className="mr-3"
                        onClick={() => nextWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                        <img
                            src="left_arrow_nav.png"
                            alt="next Week"
                            className='w-8 h-8 hover:bg-gray-200 p-2 rounded-full'
                        />
                    </button>
                </div>

                <p className='font-bold'>{months[currentMonth]} {currentYear}</p>

            </div>

            <p className='mr-10 font-bold'>{userName}</p>
        </div>
    );
}