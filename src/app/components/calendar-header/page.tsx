import { Dispatch, SetStateAction } from 'react';

import prevWeek from '@/app/date/prevWeek';
import nextWeek from '@/app/date/nextWeek';

interface CalendarHeaderProps {
    userName: string;
    currentYear: number;
    currentMonth: number;
    currentDay: number;
    setCurrentDay: Dispatch<SetStateAction<number>>;
    setCurrentMonth: Dispatch<SetStateAction<number>>;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    months: string[];
}

export default function CalendarHeader({ userName, currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear, months }: CalendarHeaderProps) {
    return (
        <div className='flex ml-52 justify-between'>
            <div className='flex flex-col'>
                <div className='flex'>
                    <button
                        className="mr-3"
                        onClick={() => prevWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                        PREV WEEK
                    </button>
                    <button
                        className="mr-3"
                        onClick={() => nextWeek(currentYear, currentMonth, currentDay, setCurrentDay, setCurrentMonth, setCurrentYear)}>
                        NEXT WEEK
                    </button>
                </div>

                <p className='font-bold'>{months[currentMonth]} {currentYear}</p>
            </div>

            <p className='mr-10 font-bold'>{userName}</p>
        </div>
    )
}