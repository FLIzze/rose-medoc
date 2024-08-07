'use client';

import { useState, useEffect } from 'react';
import CalEvent from "../event/page";
import createEvent from '@/app/event';

export default function WeeklyCal() {
    const days = ["Empty", "LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];

    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [dates, setDates] = useState<string[]>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [begginingHour, setBegginingHour] = useState(0);
    const [endHour, setEndHour] = useState(0);

    const [currentDayMeeting, setCurrentDayMeeting] = useState(0);
    const [currentHour, setCurrentHour] = useState(0);

    useEffect(() => {
        updateWeekDates();
    }, [currentDay, currentMonth, currentYear]);

    function updateWeekDates() {
        const newDates = ["Empty"];
        const currentDate = new Date(currentYear, currentMonth, currentDay);
        const currentDayOfWeek = currentDate.getDay();
        for (let i = 1; i <= 7; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - currentDayOfWeek + i);
            newDates.push(date.getDate().toString());
        }
        setDates(newDates);
    }

    function nextWeek() {
        const newDate = new Date(currentYear, currentMonth, currentDay);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDay(newDate.getDate());
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    }

    function prevWeek() {
        const newDate = new Date(currentYear, currentMonth, currentDay);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDay(newDate.getDate());
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    }

    function displayBegginingHour() {
        const begginingHour = document.getElementById('begginingHour');
        if (begginingHour) {
            begginingHour.classList.remove('hidden');
            begginingHour.classList.add('absolute');

            document.addEventListener('click', function handleClickOutside(event) {
                if (!begginingHour.contains(event.target as Node)) {
                    begginingHour.classList.remove('absolute');
                    begginingHour.classList.add('hidden');
                    document.removeEventListener('click', handleClickOutside);
                }
            });
        }
    }

    function setBegginingHourState(hour: number) {
        setBegginingHour(hour);
    }

    function setEndHourState(hour: number) {
        setEndHour(hour);
    }

    function displayEndHour() {
        const endHour = document.getElementById('endHour');
        if (endHour) {
            endHour.classList.remove('hidden');
            endHour.classList.add('absolute');

            document.addEventListener('click', function handleClickOutside(event) {
                if (!endHour.contains(event.target as Node)) {
                    endHour.classList.remove('absolute');
                    endHour.classList.add('hidden');
                    document.removeEventListener('click', handleClickOutside);
                }
            });
        }
    }

    async function newMeeting(hour: number, day: number) {
        const calendarPopup = document.getElementById("calendarPopup");
        if (calendarPopup) {
            setCurrentDayMeeting(day);
            setCurrentHour(hour);
            setBegginingHour(hour);
            setEndHour(hour + 1);

            calendarPopup.classList.remove("hidden");
            calendarPopup.classList.add("absolute");

            document.addEventListener('click', function handleClickOutside(event) {
                if (!calendarPopup.contains(event.target as Node)) {
                    calendarPopup.classList.remove('absolute');
                    calendarPopup.classList.add('hidden');
                    document.removeEventListener('click', handleClickOutside);
                }
            });
        }
    }

    async function createNewMeeting() {
        // console.log(`Meeting created: ${title} ${description} ${days[currentDayMeeting]} ${hours[currentHour]}:00 ${months[currentMonth]} ${currentYear}`);
        await createEvent(dates[currentDayMeeting], hours[currentHour], currentMonth, currentYear, title, description);
    }

    return (
        <div>
            <button
                className="mr-3 ml-52 pl-1"
                onClick={prevWeek}>
                PREV WEEK
            </button>
            <button
                className="mr-3"
                onClick={nextWeek}>
                NEXT WEEK
            </button>

            <div className="hidden w-96 h-fit bg-white rounded-lg shadow-2xl py-5" id="calendarPopup">
                <div className='flex flex-col gap-4 text-sm ml-7 mr-4'>
                    <input
                        type="text"
                        placeholder='Ajouter un titre *'
                        className='border-b border-gray-300 outline-none pl-3 font-bold'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div>
                        <div className='flex gap-2'>
                            <button className='py-2 px-6 hover:bg-gray-300 rounded-lg'>{days[currentDayMeeting]} {dates[currentDayMeeting]} {months[currentMonth]}</button>
                            <div>
                                <button className='py-2 px-6 hover:bg-gray-300 rounded-lg' onClick={displayBegginingHour}>{hours[begginingHour]}:00</button>
                                <div className='hidden' id='begginingHour'>
                                    <div className='flex-col bg-white shadow-xl h-44 overflow-scroll flex'>
                                        {hours.map((hour, index) => (
                                            <button key={index} className='text-start py-2 pl-4 pr-12 hover:bg-gray-200' onClick={() => setBegginingHourState(hour)}>{begginingHour}:00</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className='py-2'>-</p>
                            <div>
                                <button className='py-2 px-6 hover:bg-gray-300 rounded-lg' onClick={displayEndHour}>{hours[endHour]}:00</button>
                                <div className='hidden' id='endHour'>
                                    <div className='flex-col bg-white shadow-xl h-44 overflow-scroll flex'>
                                        {hours.map((hour, index) => (
                                            <button key={index} className='text-start py-2 pl-4 pr-12 hover:bg-gray-200' onClick={() => setEndHourState(hour)}>{hour}:00</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <textarea
                        placeholder='Ajouter une description'
                        className='text-xs bg-gray-200 rounded-lg outline-none pl-2 pt-2 w-full h-32 resize-none font-medium'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <button className='bg-green-500 rounded-lg text-white h-9' onClick={createNewMeeting}>Enregistrer</button>
                </div>
            </div>

            <p className='font-bold ml-52 pl-1'>{months[currentMonth]} {currentYear}</p>
            <div className="grid grid-cols-8 w-full pt-6">
                {days.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white">
                        {day === "Empty" ? (
                            <div>
                                <div className="bg-white p-6"></div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600 text-xs">{day}</p>
                                <p className="text-2xl font-semibold">{dates[dayIndex]}</p>
                            </div>
                        )}
                        {hours.map((hour, hoursIndex) => (
                            <div key={hoursIndex}>
                                {dayIndex === 0 ? (
                                    <div className="text-right text-gray-400 text-xs pt-1 pb-16 mb-1 pr-3">{hour}:00</div>
                                ) : (
                                    <div onClick={() => newMeeting(hoursIndex, dayIndex)}>
                                        <div className="bg-white">
                                            <div className="bg-white p-11 border-l border-t border-gray-300"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
