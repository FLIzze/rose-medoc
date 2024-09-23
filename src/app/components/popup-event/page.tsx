"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import Draggable from "../draggable/page";
import { UserInterface } from "@/app/model/user";
import Header from "./header/page";
import addEvent from "@/app/event/addEvent";
import hideEventPopup from "@/app/event/hideEventPopup";
import Participants from "./participants/page";
import Date from "./date/page";
import Location from "./location/page";

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
    setDate: Dispatch<SetStateAction<Date>>
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
    setDate }: PopupEventProps) {

    const [endHour, setEndHour] = useState(date.getHours() + 1);

    useEffect(() => {
        setEndHour(date.getHours() + 1);
    }, [date])

    return (

        <Draggable pos={pos} size={{ width: 415, height: 345 }}>
            <div
                className="absolute opacity-0 h-fit bg-white shadow-2xl transition-all duration-150 w-fit pointer-events-none text-dark-pink rounded-br-lg"
                id="eventPopup"
            >
                <Header
                    setIsPopupVisible={setIsPopupVisible}
                />

                <div className="grid grid-cols-[auto,2fr] gap-x-6 mr-6">
                    <div className="bg-light-pink flex items-center justify-center p-2">
                        <img
                            src="/title.png"
                            alt="title"
                            className='w-5 h-5 mx-3'
                        />
                    </div>
                    <input
                        type="text"
                        placeholder='Ajouter un titre'
                        className='outline-none text-xl h-9 transition-all my-2 hover:bg-very-light-pink w-full rounded-lg pl-2 focus:bg-very-light-pink'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="text-xs text-red-500 hidden" id="required-title">Titre obligatoire.</p>

                    <div className="bg-light-pink flex items-center justify-center p-2">
                        <img
                            src="/clock.png"
                            alt="date"
                            className='w-5 h-5 mx-3'
                        />
                    </div>
                    <Date
                        date={date}
                        setDate={setDate}
                        endHour={endHour}
                        setEndHour={setEndHour}
                    />

                    <div className="bg-light-pink flex items-center justify-center p-4">
                        <img
                            src="/description.png"
                            alt="description"
                            className='w-5 h-5 mx-3'
                        />
                    </div>
                    <textarea
                        placeholder='Ajouter une description'
                        className='rounded-lg outline-none pl-2 mt-2 w-full resize-none hover:bg-gray-100 transition-all focus:h-40 focus:bg-very-light-pink hover:bg-very-light-pink'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="bg-light-pink flex items-center justify-center p-2">
                        <img
                            src="/person.png"
                            alt="participants"
                            className='w-5 h-5 mx-3'
                        />
                    </div>
                    <Participants
                        setParticipants={setParticipants}
                        participants={participants}
                        users={users}
                        currentUser={currentUser}
                    />

                    <div className="bg-light-pink flex items-center justify-center p-2">
                        <img
                            src="/pin.png"
                            alt="location"
                            className='w-5 h-5 mx-3'
                        />
                    </div>
                    <Location
                        setLocation={setLocation}
                        location={location}
                    />

                    <div className="col-span-2 flex justify-end">
                        <button
                            className='rounded-lg text-white bg-medium-pink hover:bg-dark-pink transition-all px-4 py-2 mt-7 mb-4 w-44'
                            onClick={() => {
                                addEvent(title, description, setEvents, currentUser, participants, location, date, endHour);
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