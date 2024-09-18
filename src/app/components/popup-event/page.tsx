"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import Draggable from "../draggable/page";
import addEvent from "@/app/event/addEvent";
import { UserInterface } from "@/app/model/user";
import Participant from "./participant/page";
import Location from "./location/page";
import Date from "./date/page";
import hideEventPopup from "@/app/event/hideEventPopup";

interface PopupEventProps {
    setEvents: Dispatch<SetStateAction<EventInterface[]>>
    pos: { x: number, y: number },
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    description: string,
    setDescription: Dispatch<SetStateAction<string>>,
    currentUser: UserInterface | undefined,
    users: UserInterface[],
    participants: UserInterface[],
    setParticipants: Dispatch<SetStateAction<UserInterface[]>>,
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>,
    location: string,
    setLocation: Dispatch<SetStateAction<string>>,
    eventPopUpDate: Date,
    months: string[]
}

export default function PopupEvent({
    setEvents,
    pos,
    title,
    setTitle,
    description,
    setDescription,
    currentUser,
    users,
    participants,
    setParticipants,
    setIsPopupVisible,
    location,
    setLocation,
    eventPopUpDate,
    months }: PopupEventProps) {

    const [isBeginningHoursVisible, setIsBeginningHoursVisible] = useState(false);
    const [isEndHoursVisible, setIsEndHoursVisible] = useState(false);
    const beginningHoursRef = useRef<HTMLDivElement>(null);
    const endHoursRef = useRef<HTMLDivElement>(null);

    const [participantsInput, setParticipantsInput] = useState("");

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
            <div
                className="absolute opacity-0 h-fit bg-white shadow-2xl transition-all duration-150 w-fit pointer-events-none text-dark-pink"
                id="eventPopup"
            >
                <div className="flex justify-end pr-5 h-9 w-full bg-medium-pink">
                    <button onClick={() => hideEventPopup(setIsPopupVisible)}>
                        <img
                            src="/cross.png"
                            alt="cross"
                            className="w-7 h-7 p-1 hover:bg-dark-pink rounded-full"
                        />
                    </button>
                </div>

                <div className='flex flex-col text-sm mt-3 text-gray-600 pl-9 pr-7 pb-5 pt-2'>
                    <div className="pl-10">
                        <input
                            type="text"
                            placeholder='Ajouter un titre'
                            className='border-b border-light-pink outline-none text-xl h-9 transition-all w-80 mb-2 placeholder:text-dark-pink focus:border-medium-pink focus:border-b-2'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <p className="text-xs text-red-500 hidden" id="required-title">Titre obligatoire.</p>

                    <Date
                        isEndHoursVisible={isEndHoursVisible}
                        isBeginningHoursVisible={isBeginningHoursVisible}
                        setIsBeginningHoursVisible={setIsBeginningHoursVisible}
                        setIsEndHoursVisible={setIsEndHoursVisible}
                        beginningHoursRef={beginningHoursRef}
                        endHoursRef={endHoursRef}
                        eventPopUpDate={eventPopUpDate}
                        months={months}
                    />

                    <div className="flex items-center">
                        <img
                            src="description.png"
                            alt="description"
                            className='w-4 h-4 mr-5'
                        />
                        <textarea
                            placeholder='Ajouter une description'
                            className='rounded-sm outline-none pl-2 pt-2 w-full resize-none hover:bg-gray-100 transition-all h-9 focus:h-40 focus:bg-gray-100'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <Participant
                        users={users}
                        participants={participants}
                        setParticipants={setParticipants}
                        participantsInput={participantsInput}
                        setParticipantsInput={setParticipantsInput}
                        currentUser={currentUser}
                    />

                    <Location
                        setLocation={setLocation}
                    />

                    <div className="flex justify-end mt-4">
                        <button
                            className='rounded-sm h-10 border border-gray-200 transition-all hover:bg-gray-100 w-2/5'
                            onClick={() => {
                                addEvent(title, description, setEvents, currentUser, participants, location);
                                hideEventPopup(setIsPopupVisible)
                            }}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}