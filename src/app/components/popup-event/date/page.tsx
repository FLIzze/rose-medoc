"use client";

import capitalizeFirstLetter from "@/app/capitalizeFirstLetter";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface DateFieldProps {
    popupDate: Date,
    setPopupDate: Dispatch<SetStateAction<Date>>,
    endHour: number,
    setEndHour: Dispatch<SetStateAction<number>>
}

export default function DateField({ popupDate, setPopupDate, endHour, setEndHour }: Readonly<DateFieldProps>) {
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

    function handleBeginningHourClick(hour: number) {
        setEndHour(hour + 1);
        setPopupDate(new Date(popupDate.setHours(hour)));
        setIsBeginningHoursVisible(false);
    }

    function handleEndHourClick(hour: number) {
        setEndHour(hour);
        setIsEndHoursVisible(false);
    }

    return (
        <div className="flex items-center pt-4 text-dark-pink">
            <button
                className="hover:bg-very-light-pink p-1 text-left flex-wrap whitespace-nowrap rounded-lg"
            >
                {capitalizeFirstLetter(popupDate.toLocaleDateString('fr-FR', { weekday: 'long' }))}, {popupDate.getDate()} {capitalizeFirstLetter(popupDate.toLocaleDateString('fr-FR', { month: 'long' }))} {popupDate.getFullYear()}            </button>

            <div>
                <button
                    className='text-left hover:bg-very-light-pink p-1 rounded-lg'
                    onClick={toggleBeginningHours}
                >
                    {popupDate.getHours()}:00
                </button>

                <div
                    ref={beginningHoursRef}
                    className={`absolute border border-gray-200 rounded-lg h-52 overflow-scroll flex-col bg-white mt-1 ${isBeginningHoursVisible ? 'flex' : 'hidden'}`}
                    id="beginningHours"
                    style={{ zIndex: 10 }}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 7).map((hour, index) => (
                        <button
                            key={index}
                            className="hover:bg-gray-100 p-2 text-left w-32 hover:bg-very-light-pink"
                            onClick={() => handleBeginningHourClick(hour)}
                        >
                            {hour}:00
                        </button>
                    ))}
                </div>
            </div>

            <p className="py-2 px-1 text-center">-</p>

            <div className="w-full">
                <button
                    className='text-left hover:bg-very-light-pink p-1 rounded-lg'
                    onClick={toggleEndHours}
                >
                    {endHour}:00
                </button>

                <div
                    ref={endHoursRef}
                    className={`absolute border border-gray-200 rounded-lg max-h-52 overflow-scroll flex-col bg-white mt-1 ${isEndHoursVisible ? 'flex' : 'hidden'}`}
                    id="endHours"
                    style={{ zIndex: 10 }}
                >
                    {Array.from({ length: Math.min(14, 20 - popupDate.getHours() - 1) }, (_, i) => i + popupDate.getHours() + 1).map((hour, index) => (
                        <button
                            key={index}
                            className="hover:bg-gray-100 p-2 text-left w-32 hover:bg-very-light-pink"
                            onClick={() => handleEndHourClick(hour)}
                        >
                            {hour}:00
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}