"use client";

import { useEffect, useRef } from 'react';
import hideCalendarMode from '@/app/event/hideCalendarMode';
import capitalizeFirstLetter from '@/app/capitalizeFirstLetter';
import { useAtom, useSetAtom } from 'jotai';
import { calendarModeAtom, dateAtom, isCalendarModeVisibleAtom, sidebarDateAtom } from '@/app/atom';
import Image from 'next/image';
import prevWeek from '@/app/date/prevWeek';
import nextWeek from '@/app/date/nextWeek';
import displayCalendarMode from '@/app/event/displayCalendarMode';
import Profile from '../profil/profil';


const CalendarHeader = () => {
    const [isCalendarModeVisible, setIsCalendarModeVisible] = useAtom(isCalendarModeVisibleAtom);
    const [calendarMode, setCalendarMode] = useAtom(calendarModeAtom);

    const [date, setDate] = useAtom(dateAtom);

    const setSidebarDate = useSetAtom(sidebarDateAtom);

    const dropdownRef = useRef<HTMLDivElement>(null);

    function goToToday() {
        const today = new Date();
        setDate(today);
    }

    useEffect(() => {
        setSidebarDate(date);
    }, [date, setSidebarDate]);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                hideCalendarMode(setIsCalendarModeVisible);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, setIsCalendarModeVisible]);

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    // Calculate the end of the week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Determine the month display
    const startMonth = capitalizeFirstLetter(startOfWeek.toLocaleDateString('fr-FR', { month: 'long' }));
    const endMonth = capitalizeFirstLetter(endOfWeek.toLocaleDateString('fr-FR', { month: 'long' }));
    const monthDisplay = startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;

    return (
        <div className='flex ml-16 justify-between items-center'>
            <div className='flex items-center'>
                <div className='flex'>
                    <button
                        className="mr-3"
                        onClick={goToToday}
                    >
                        <Image
                            src="/home.png"
                            alt="home"
                            className='bg-medium-pink hover:bg-dark-pink transition-all p-2 rounded-full'
                            width={40}
                            height={40}
                        />
                    </button>
                    <button
                        className="mr-3"
                        onClick={() => prevWeek(date, setDate, calendarMode)}
                    >
                        <Image
                            src="/left_arrow.png"
                            alt="prev Week"
                            className='bg-medium-pink hover:bg-dark-pink transition-all p-2 rounded-full'
                            width={40}
                            height={40}
                        />
                    </button>
                    <button
                        className="mr-3"
                        onClick={() => nextWeek(date, setDate, calendarMode)}
                    >
                        <Image
                            src="/right_arrow.png"
                            alt="next Week"
                            className='bg-medium-pink hover:bg-dark-pink transition-all p-2 rounded-full'
                            width={40}
                            height={40}
                        />
                    </button>
                </div>

                {calendarMode == "Semaine" ? (
                    <p className='font-bold text-dark-pink'>{monthDisplay} {date.getFullYear()}</p>
                ) : (
                    <p className='font-bold text-dark-pink'>{startMonth} {date.getFullYear()}</p>
                )}

            </div>

            <div className='flex justify-end items-center'>
                <div className='mr-7' ref={dropdownRef}>
                    <button
                        className='mr-5 text-white bg-medium-pink pl-3 py-2 rounded-full transition-all hover:bg-dark-pink flex items-center text-sm w-full'
                        onClick={() => displayCalendarMode(setIsCalendarModeVisible, isCalendarModeVisible)}
                    >
                        {calendarMode}
                        <Image
                            src="/down_arrow.png"
                            alt="derouler"
                            className='ml-4'
                            width={10}
                            height={10}
                        />
                    </button>

                    <div
                        className="absolute text-sm flex flex-col bg-medium-pink rounded-lg shadow-2xl items-start pl-2 py-3 text-white mt-2 transition-opacity duration-300 z-10 w-40 opacity-0 pointer-events-none"
                        id='calMode'
                    >
                        <button
                            onClick={() => {
                                setCalendarMode('Jour');
                                hideCalendarMode(setIsCalendarModeVisible)
                            }}
                            className='hover:bg-dark-pink w-full rounded-lg text-left pl-3 transition-all h-9 pr-32'
                        >
                            Jour
                        </button>
                        <button
                            onClick={() => {
                                setCalendarMode('Semaine');
                                hideCalendarMode(setIsCalendarModeVisible)
                            }}
                            className='hover:bg-dark-pink w-full rounded-lg text-left pl-3 transition-all h-9 pr-32'
                        >
                            Semaine
                        </button>
                        <button
                            onClick={() => {
                                setCalendarMode('Mois');
                                hideCalendarMode(setIsCalendarModeVisible)
                            }}
                            className='hover:bg-dark-pink w-full rounded-lg text-left pl-3 transition-all h-9 pr-32'
                        >
                            Mois
                        </button>
                    </div>
                </div>

                <Profile />
            </div>
        </div>
    );
}

export default CalendarHeader;