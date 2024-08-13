import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import createNewMeeting from "@/app/meeting/createNewMeeting";
import Draggable from "../draggable/page";

interface PopupMeetingProps {
    beginningHour: number,
    endHour: number,
    currentDayMeeting: number,
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
    setEndHour: Dispatch<SetStateAction<number>>
}

export default function PopupMeeting({
    beginningHour,
    endHour,
    currentDayMeeting,
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
    setEndHour }: PopupMeetingProps) {

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

    return (
        <Draggable posX={posX} posY={posY}>
            <div className="absolute opacity-0 w-96 h-fit bg-white rounded-lg shadow-2xl py-5 transition-all duration-150 pb-6" id="calendarPopup">
                <div className='flex flex-col gap-4 text-sm ml-16 mt-5 mr-8 text-gray-600'>
                    <input
                        type="text"
                        placeholder='Ajouter un titre'
                        className='border-b border-gray-200 outline-none text-xl font-semibold h-9 transition-all focus:font-normal'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div>
                        <div className='flex gap-2 rounded-lg justify-around h-9 border border-gray-200 items-center'>
                            <button
                                className='hover:bg-gray-200 rounded-lg w-full transition-all h-full'
                                onClick={toggleBeginningHours}
                            >
                                {beginningHour}:00
                            </button>

                            <p>-</p>

                            <button
                                className='hover:bg-gray-200 rounded-lg w-full transition-all h-full'
                                onClick={toggleEndHours}
                            >
                                {endHour}:00
                            </button>
                        </div>

                        <div
                            ref={beginningHoursRef}
                            className={`border border-gray-200 rounded-lg mt-2 h-52 overflow-scroll flex-col bg-white w-48 ${isBeginningHoursVisible ? 'flex' : 'hidden'}`}
                            id="beginningHours"
                        >
                            {hours.map((hour, index) => (
                                <button
                                    key={index}
                                    className="hover:bg-gray-200 p-2 text-left pl-5"
                                    onClick={() => setBeginningHour(hour)}
                                >
                                    {hour}:00
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <div
                                ref={endHoursRef}
                                className={`border border-gray-200 rounded-lg mt-2 h-52 overflow-scroll flex-col bg-white w-48 ${isEndHoursVisible ? 'flex' : 'hidden'}`}
                                id="endHours"
                            >
                                {hours.map((hour, index) => (
                                    <button
                                        key={index}
                                        className="hover:bg-gray-200 p-2 text-left pl-5"
                                        onClick={() => setEndHour(hour)}
                                    >
                                        {hour}:00
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <textarea
                        placeholder='Ajouter une description'
                        className='text-xs  border-gray-200 border rounded-lg outline-none pl-2 pt-2 w-full h-32 resize-none hover:bg-gray-200 transition-all'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        className='rounded-lg h-10 border border-gray-200 transition-all hover:bg-gray-200'
                        onClick={() => createNewMeeting(dates, currentDayMeeting, beginningHour, endHour, currentMonth, currentYear, title, description, setEvents)}>
                        Enregistrer
                    </button>
                </div>
            </div>
        </Draggable>
    )
}