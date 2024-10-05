"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import Draggable from "../draggable/draggable";
import { UserInterface } from "@/app/model/user";
import Header from "./header/header";
import addEvent from "@/app/event/addEvent";
import hideEventPopup from "@/app/event/hideEventPopup";
import Participants from "./participants/participants";
import DateComponent from "./date/date";
import Location from "./location/location";
import Image from "next/image";

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
    date: Date,
    setPopupDate: Dispatch<SetStateAction<Date>>,
    popupDate: Date
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
    date,
    setPopupDate,
    popupDate }: Readonly<PopupEventProps>) {

    const [endHour, setEndHour] = useState(date.getHours() + 1);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setEndHour(popupDate.getHours() + 1);
    }, [popupDate]);

    useEffect(() => {
        if (popupRef.current) {
            const { offsetWidth, offsetHeight } = popupRef.current;
            setSize({ width: offsetWidth, height: offsetHeight });
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                hideEventPopup(setIsPopupVisible);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    return (
        <Draggable>
            <div
                ref={popupRef}
                className="absolute opacity-0 h-fit bg-white shadow-2xl transition-all duration-150 w-fit pointer-events-none text-dark-pink rounded-br-lg"
                id="eventPopup"
            >
                <Header setIsPopupVisible={setIsPopupVisible} />

                <div className="grid grid-cols-[auto,2fr] gap-x-6 mr-6">
                    <div className="bg-light-pink flex items-center justify-center p-2">
                        <Image
                            src="/title.png"
                            alt="title"
                            className='mx-3'
                            width={40}
                            height={40}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder='Ajouter un titre'
                        className='h-9 outline-none p-2 mt-2 w-full transition-all text-medium-pink text-xl border-very-light-pink focus:border-medium-pink font-bold border-b-2 focus:border-b-4'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="text-xs text-red-500 hidden" id="required-title">Titre obligatoire.</p>

                    <div className="bg-light-pink flex items-center justify-center pt-4">
                        <Image
                            src="/clock.png"
                            alt="date"
                            className='mx-3'
                            width={40}
                            height={40}
                        />
                    </div>
                    <DateComponent
                        popupDate={popupDate}
                        setPopupDate={setPopupDate}
                        endHour={endHour}
                        setEndHour={setEndHour}
                    />

                    <div className="bg-light-pink flex items-center justify-center p-4">
                        <Image
                            src="/description.png"
                            alt="description"
                            className='mx-3'
                            width={40}
                            height={40}
                        />
                    </div>
                    <input
                        placeholder='Ajouter une description'
                        className='outline-none pl-2 mt-2 w-full resize-none h-9 focus:border-b-2 border-medium-pink transition-all text-medium-pink'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="bg-light-pink flex items-center justify-center p-4">
                        <Image
                            src="/person.png"
                            alt="participants"
                            className='mx-3'
                            width={40}
                            height={40}
                        />
                    </div>
                    <Participants
                        setParticipants={setParticipants}
                        participants={participants}
                        users={users}
                        currentUser={currentUser}
                    />

                    <div className="bg-light-pink flex items-center justify-center p-4">
                        <Image
                            src="/pin.png"
                            alt="location"
                            className='mx-3'
                            width={40}
                            height={40}
                        />
                    </div>
                    <Location
                        setLocation={setLocation}
                        location={location}
                    />

                    <div className="col-span-2 flex justify-end">
                        <button
                            className='rounded-lg text-white bg-medium-pink hover:bg-dark-pink transition-all mx-4 py-2 mt-5 mb-4 w-full'
                            onClick={() => {
                                addEvent(title, description, setEvents, currentUser, participants, location, popupDate, endHour);
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