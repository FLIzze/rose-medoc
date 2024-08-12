import { Dispatch, SetStateAction, useEffect } from "react";
import { EventInterface } from "@/app/model/event";
import createNewMeeting from "@/app/meeting/createNewMeeting";
import { useState } from "react";
import Draggable from "../draggable/page";

interface PopupMeetingProps {
    begginingHour: number,
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
    posY: number
}

export default function PoopupMeeting({ begginingHour,
    endHour,
    currentDayMeeting,
    currentMonth,
    currentYear,
    currentHour,
    days, dates,
    months,
    hours,
    setEvents,
    posX,
    posY }: PopupMeetingProps) {
        
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Draggable posX={posX} posY={posY}>
            <div className="absolute opacity-0 w-96 h-fit bg-white rounded-lg shadow-2xl py-5 transition-all duration-125" id="calendarPopup">
                <div className='flex flex-col gap-4 text-sm ml-7 mr-4'>
                    <input
                        type="text"
                        placeholder='Ajouter un titre *'
                        className='border-b border-gray-300 outline-none pl-3 font-bold'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className='flex gap-2'>
                        <button className='py-2 px-6 hover:bg-gray-300 rounded-lg'>{days[currentDayMeeting]} {dates[currentDayMeeting]} {months[currentMonth]}</button>
                        <button className='py-2 px-6 hover:bg-gray-300 rounded-lg'>{hours[begginingHour]}:00</button>
                        <button className='py-2 px-6 hover:bg-gray-300 rounded-lg'>{hours[endHour]}:00</button>
                    </div>
                    <textarea
                        placeholder='Ajouter une description'
                        className='text-xs bg-gray-200 rounded-lg outline-none pl-2 pt-2 w-full h-32 resize-none font-medium'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button className='bg-green-500 rounded-lg text-white h-9' onClick={() => createNewMeeting(dates, hours, currentDayMeeting, currentHour, currentMonth, currentYear, title, description, setEvents)}>Enregistrer</button>
                </div>
            </div>
        </Draggable>
    )
}