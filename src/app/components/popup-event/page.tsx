import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import Draggable from "../draggable/page";
import addEvent from "@/app/event/addEvent";
import { UserInterface } from "@/app/model/user";
import Participant from "./participant/page";
import Location from "./location/page";
import Date from "./date/page";

interface PopupEventProps {
    beginningHour: number,
    endHour: number,
    currentDayEvent: number,
    currentMonth: number,
    currentYear: number,
    days: string[],
    dates: string[],
    months: string[],
    hours: number[],
    setEvents: Dispatch<SetStateAction<EventInterface[]>>
    pos: { x: number, y: number },
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>,
    setBeginningHour: Dispatch<SetStateAction<number>>,
    setEndHour: Dispatch<SetStateAction<number>>,
    currentUser: UserInterface | undefined,
    users: UserInterface[],
    participants: UserInterface[],
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>
}

export default function PopupEvent({
    beginningHour,
    endHour,
    currentDayEvent,
    currentMonth,
    currentYear,
    days,
    dates,
    months,
    hours,
    setEvents,
    pos,
    title,
    setTitle,
    description,
    setDescription,
    setBeginningHour,
    setEndHour,
    currentUser,
    users,
    participants,
    setParticipants }: PopupEventProps) {

    const [isBeginningHoursVisible, setIsBeginningHoursVisible] = useState(false);
    const [isEndHoursVisible, setIsEndHoursVisible] = useState(false);
    const beginningHoursRef = useRef<HTMLDivElement>(null);
    const endHoursRef = useRef<HTMLDivElement>(null);

    const [participantsInput, setParticipantsInput] = useState("");
    const [location, setLocation] = useState("Piece de vie");

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

    return (
        <Draggable pos={pos} size={{ width: 415, height: 345 }}>
            <div className="absolute opacity-0 h-fit bg-white rounded-sm shadow-2xl py-5 transition-all duration-150 pb-6 w-fit pointer-events-none pr-8 pl-16" id="calendarPopup">
                <div className='flex flex-col text-sm mt-5 text-gray-600'>
                    <input
                        type="text"
                        placeholder='Ajouter un titre'
                        className='border-b outline-none text-xl font-semibold h-9 transition-all focus:font-normal w-80 border-white focus:border-gray-500 hover:bg-gray-100 pl-2 mb-6'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <p className="text-xs text-red-500 hidden" id="required-title">Titre obligratoire.</p>

                    <Date
                        days={days}
                        hours={hours}
                        isEndHoursVisible={isEndHoursVisible}
                        isBeginningHoursVisible={isBeginningHoursVisible}
                        currentDayEvent={currentDayEvent}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        beginningHour={beginningHour}
                        endHour={endHour}
                        setBeginningHour={setBeginningHour}
                        setEndHour={setEndHour}
                        setIsEndHoursVisible={setIsEndHoursVisible}
                        setIsBeginningHoursVisible={setIsBeginningHoursVisible}
                        dates={dates}
                        months={months}
                        beginningHoursRef={beginningHoursRef}
                        endHoursRef={endHoursRef}
                    />

                    <textarea
                        placeholder='Ajouter une description'
                        className='rounded-sm outline-none pl-2 pt-2 w-full resize-none hover:bg-gray-100 transition-all h-9 focus:h-40 focus:bg-gray-100 border-b border-white focus:border-gray-500'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Participant
                        users={users}
                        participants={participants}
                        setParticipants={setParticipants}
                        participantsInput={participantsInput}
                        setParticipantsInput={setParticipantsInput}
                        currentUser={currentUser}
                    />

                    <Location 
                        location={location}
                        setLocation={setLocation}
                    />

                    <div className="flex justify-end mt-4">
                        <button
                            className='rounded-sm h-10 border border-gray-200 transition-all hover:bg-gray-100 w-2/5'
                            onClick={() => addEvent(dates, currentDayEvent, beginningHour, endHour, currentMonth, currentYear, title, description, setEvents, currentUser, participants, location)}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}