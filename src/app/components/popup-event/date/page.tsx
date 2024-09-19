"use client";

import capitalizeFirstLetter from "@/app/capitalizeFirstLetter";
import { useEffect, useRef, useState } from "react";

interface DateProps {
    date: Date
}

export default function Date({ date }: DateProps) {
    const [isBeginningHoursVisible, setIsBeginningHoursVisible] = useState(false);
    const [isEndHoursVisible, setIsEndHoursVisible] = useState(false);
    const beginningHoursRef = useRef<HTMLDivElement>(null);
    const endHoursRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (beginningHoursRef.current && !beginningHoursRef.current.contains(event.target as Node)) {
                setIsBeginningHoursVisible(false);
            }
            if (endHoursRef.current && !endHoursRef.current.contains(event.target as Node)) {
                setIsEndHoursVisible(false);
            }
        }

        if (isBeginningHoursVisible || isEndHoursVisible) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isBeginningHoursVisible, isEndHoursVisible]);

    function toggleBeginningHours() {
        if (isEndHoursVisible) {
            setIsEndHoursVisible(false);
        }

        setIsBeginningHoursVisible(prevState => !prevState);
    }

    function toggleEndHours() {
        if (isBeginningHoursVisible) {
            setIsBeginningHoursVisible(false);
        }

        setIsEndHoursVisible(prevState => !prevState);
    }

    // function handleBeginningHourClick(hour: number) {
    //     setBeginningHour(hour);
    //     if (hour >= endHour) {
    //         setEndHour(hour + 1);
    //     } else if (hour < endHour - 4) {
    //         setEndHour(hour + 1);
    //     }
    //     setIsBeginningHoursVisible(false);
    // }

    // function handleEndHourClick(hour: number) {
    //     setEndHour(hour);
    //     setIsEndHoursVisible(false);
    // }

    return (
        <div>
            <div className="flex items-center">
                <button
                    className="hover:bg-gray-100 transition-all py-2 px-2 text-left flex-wrap whitespace-nowrap"
                >
                    {capitalizeFirstLetter(date.toLocaleDateString('fr-FR', { weekday: 'long' }))}, {date.getDate()} {capitalizeFirstLetter(date.toLocaleDateString('fr-FR', { month: 'long' }))} {date.getFullYear()}
                </button>

                <div>
                    <button
                        className='py-2 text-left hover:bg-gray-100 px-2'
                        onClick={toggleBeginningHours}
                    >
                        {date.getHours()}:00
                    </button>

                    <div
                        ref={beginningHoursRef}
                        className={`absolute border border-gray-200 rounded-sm h-52 overflow-scroll flex-col bg-white mt-1 ${isBeginningHoursVisible ? 'flex' : 'hidden'}`}
                        id="beginningHours"
                        style={{ zIndex: 10 }}
                    >
                        {/* {hours.map((hour, index) => (
                        <button
                            key={index}
                            className="hover:bg-gray-100 text-left p-2 w-32"
                            onClick={() => handleBeginningHourClick(hour)}
                        >
                            {hour}:00
                        </button>
                    ))} */}
                    </div>
                </div>

                <p className="py-2 px-1 text-center">-</p>

                <div className="w-full">
                    <button
                        className='py-2 text-left px-2 hover:bg-gray-100'
                        onClick={toggleEndHours}
                    >
                        {date.getHours() + 1}:00
                    </button>

                    <div
                        ref={endHoursRef}
                        className={`absolute border border-gray-200 rounded-sm h-fit flex-col bg-white mt-1 ${isEndHoursVisible ? 'flex' : 'hidden'}`}
                        id="endHours"
                        style={{ zIndex: 10 }}
                    >
                        {/* {hours.map((hour, index) => (
                        (hour > beginningHour && hour <= beginningHour + 4 && (
                            <button
                                key={index}
                                className="hover:bg-gray-100 p-2 text-left w-32"
                                onClick={() => handleEndHourClick(hour)}
                            >
                                {hour}:00
                            </button>
                        ))
                    ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}