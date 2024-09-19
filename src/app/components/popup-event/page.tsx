"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import Draggable from "../draggable/page";
import { UserInterface } from "@/app/model/user";
import Participant from "./participant/page";
import Location from "./location/page";
import Date from "./date/page";
import Header from "./header/page";
import Title from "./title/page";
import Description from "./description/page";
import Save from "./save/page";

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
    months: string[],
    date: Date
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
    months,
    date }: PopupEventProps) {

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
  
                <Header
                    setIsPopupVisible={setIsPopupVisible}
                />

                <div className='flex flex-col text-sm mt-3 text-gray-600 pl-9 pr-7 pb-5 pt-2'>
                    <Title
                        title={title}
                        setTitle={setTitle}
                    />

                    <Date
                        isEndHoursVisible={isEndHoursVisible}
                        isBeginningHoursVisible={isBeginningHoursVisible}
                        setIsBeginningHoursVisible={setIsBeginningHoursVisible}
                        setIsEndHoursVisible={setIsEndHoursVisible}
                        beginningHoursRef={beginningHoursRef}
                        endHoursRef={endHoursRef}
                        months={months}
                        date={date}
                    />

                    <Description
                        description={description}
                        setDescription={setDescription}
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
                        setLocation={setLocation}
                    />

                    <Save
                        title={title}
                        description={description}
                        setEvents={setEvents}
                        currentUser={currentUser}
                        participants={participants}
                        location={location}
                        setIsPopupVisible={setIsPopupVisible}
                        date={date}
                    />
                </div>
            </div>
        </Draggable>
    )
}