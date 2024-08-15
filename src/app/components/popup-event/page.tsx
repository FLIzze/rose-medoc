import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import Draggable from "../draggable/page";
import hidePopupEvent from "@/app/event/hideEventPopup";

interface PopupEventProps {
    beginningHour: number,
    endHour: number,
    currentDayEvent: number,
    currentMonth: number,
    currentYear: number,
    currentHour: number,
    days: string[],
    dates: string[],
    months: string[],
    hours: number[],
    setEvents: Dispatch<SetStateAction<EventInterface[]>>
    posX: number,
    posY: number,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>,
    setBeginningHour: Dispatch<SetStateAction<number>>,
    setEndHour: Dispatch<SetStateAction<number>>,
}

export default function PopupEvent({
    beginningHour,
    endHour,
    currentDayEvent,
    currentMonth,
    currentYear,
    currentHour,
    days,
    dates,
    months,
    hours,
    setEvents,
    posX,
    posY,
    title,
    setTitle,
    description,
    setDescription,
    setBeginningHour,
    setEndHour}: PopupEventProps) {

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
        setBeginningHour(hour);
        if (hour >= endHour) {
            setEndHour(hour + 1);
        } else if (hour < endHour - 4) {
            setEndHour(hour + 1);
        }
        setIsBeginningHoursVisible(false);
    }

    function handleEndHourClick(hour: number) {
        setEndHour(hour);
        setIsEndHoursVisible(false);
    }

    return (
        <Draggable posX={posX} posY={posY}>
            <div className="absolute opacity-0 h-fit bg-white rounded-lg shadow-2xl py-5 transition-all duration-150 pb-6 w-fit pointer-events-none pr-8 pl-16" id="calendarPopup">
                <div className='flex flex-col text-sm mt-5 text-gray-600'>
                    <input
                        type="text"
                        placeholder='Ajouter un titre'
                        className='border-b border-gray-200 outline-none text-xl font-semibold h-9 transition-all focus:font-normal w-80'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className="flex mt-4">
                        <button
                            className="hover:bg-gray-200 transition-all py-2 px-3 text-left flex-wrap whitespace-nowrap"
                        >
                            {days[currentDayEvent]} {dates[currentDayEvent]} {months[currentMonth]} {currentYear}
                        </button>

                        <div>
                            <button
                                className='py-2 text-left hover:bg-gray-200 px-2'
                                onClick={toggleBeginningHours}
                            >
                                {beginningHour}:00
                            </button>

                            <div
                                ref={beginningHoursRef}
                                className={`absolute border border-gray-200 rounded-lg h-52 overflow-scroll flex-col bg-white mt-1 ${isBeginningHoursVisible ? 'flex' : 'hidden'}`}
                                id="beginningHours"
                                style={{ zIndex: 10 }}
                            >
                                {hours.map((hour, index) => (
                                    <button
                                        key={index}
                                        className="hover:bg-gray-200 text-left p-2 w-32"
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
                                className='py-2 text-left px-2 hover:bg-gray-200'
                                onClick={toggleEndHours}
                            >
                                {endHour}:00
                            </button>

                            <div
                                ref={endHoursRef}
                                className={`absolute border border-gray-200 rounded-lg h-fit flex-col bg-white mt-1 ${isEndHoursVisible ? 'flex' : 'hidden'}`}
                                id="endHours"
                                style={{ zIndex: 10 }}
                            >
                                {hours.map((hour, index) => (
                                    (hour > beginningHour && hour <= beginningHour + 4 && (
                                        <button
                                            key={index}
                                            className="hover:bg-gray-200 p-2 text-left w-32"
                                            onClick={() => handleEndHourClick(hour)}
                                        >
                                            {hour}:00
                                        </button>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>

                    
                    <textarea
                        placeholder='Ajouter une description'
                        className='mt-4 text-xs  bg-gray-100 rounded-sm outline-none pl-2 pt-2 w-full h-32 resize-none hover:bg-gray-200 transition-all'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />


                    <div className="flex justify-end mt-4">
                        <button
                            className='rounded-lg h-10 border border-gray-200 transition-all hover:bg-gray-200 w-2/5'
                            onClick={() => hidePopupEvent(dates, currentDayEvent, beginningHour, endHour, currentMonth, currentYear, title, description, setEvents)}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}