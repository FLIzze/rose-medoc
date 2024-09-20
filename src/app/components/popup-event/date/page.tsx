"use client";

import capitalizeFirstLetter from "@/app/capitalizeFirstLetter";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface DateProps {
    date: Date,
    setDate: Dispatch<SetStateAction<Date>>
}

export default function Date({ date, setDate }: DateProps) {
    const [isBeginningHoursVisible, setIsBeginningHoursVisible] = useState(false);
    const [isEndHoursVisible, setIsEndHoursVisible] = useState(false);
    const beginningHoursRef = useRef<HTMLDivElement>(null);
    const endHoursRef = useRef<HTMLDivElement>(null);

    const [beginningHour, setBeginningHour] = useState(date.getHours());
    const endHour = date.getHours() + 1;

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
    //     date.setHours(hour);
    //     setDate(date);
    // }

    // function handleEndHourClick(hour: number) {
    //     setEndHour(hour);
    //     setIsEndHoursVisible(false);
    // }

    return (
        <div>
            <div className="flex items-center">
                <button
                    className="hover:bg-very-light-pink py-2 px-2 text-left flex-wrap whitespace-nowrap"
                >
                    {capitalizeFirstLetter(date.toLocaleDateString('fr-FR', { weekday: 'long' }))}, {date.getDate()} {capitalizeFirstLetter(date.toLocaleDateString('fr-FR', { month: 'long' }))} {date.getFullYear()}
                </button>

                <div>
                    <button
                        className='py-2 text-left hover:bg-very-light-pink px-2'
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
                        {Array.from({ length: 18 - beginningHour }, (_, i) => i + beginningHour + 1).map((hour, index) => (
                            <button
                                key={index}
                                className="hover:bg-gray-100 p-2 text-left w-32 hover:bg-very-light-pink"
                            // onClick={() => handleBeginningHourClick(hour)}
                            >
                                {hour}:00
                            </button>
                        ))}
                    </div>
                </div>

                <p className="py-2 px-1 text-center">-</p>

                <div className="w-full">
                    <button
                        className='py-2 text-left hover:bg-very-light-pink px-2'
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
                        {Array.from({ length: 4 }, (feafea, i) => i + 2 + date.getHours()).map((hour, index) => (
                            <button
                                key={index}
                                className="hover:bg-gray-100 p-2 text-left w-32 hover:bg-very-light-pink"
                            // onClick={() => handleBeginningHourClick(hour)}
                            >
                                {hour}:00
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}