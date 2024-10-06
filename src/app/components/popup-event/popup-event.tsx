"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "../draggable/draggable";
import Header from "./header/header";
import addEvent from "@/app/event/addEvent";
import hideEventPopup from "@/app/event/hideEventPopup";
import Participants from "./participants/participants";
import Date from "./date/date";
import Location from "./location/location";
import Image from "next/image";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom, descriptionAtom, eventsAtom, isPopupVisibleAtom, locationAtom, participantsAtom, popupDateAtom, titleAtom, usersAtom } from "@/app/atom";
import Title from "./title/title";
import Description from "./description/description";

export default function PopupEvent() {
    const date = useAtomValue(popupDateAtom)
    const [popupDate, setPopupDate] = useAtom(popupDateAtom);

    const setIsPopupVisible = useSetAtom(isPopupVisibleAtom);

    const [title, setTitle] = useAtom(titleAtom);
    const [description, setDescription] = useAtom(descriptionAtom);
    const [participants, setParticipants] = useAtom(participantsAtom);
    const [location, setLocation] = useAtom(locationAtom);

    const currentUser = useAtomValue(currentUserAtom);

    const users = useAtomValue(usersAtom);

    const setEvents = useSetAtom(eventsAtom);

    const [endHour, setEndHour] = useState(date.getHours() + 1);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setEndHour(popupDate.getHours() + 1);
    }, [popupDate]);

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
                    <Title
                        title={title}
                        setTitle={setTitle}
                    />

                    <div className="bg-light-pink flex items-center justify-center pt-4">
                        <Image
                            src="/clock.png"
                            alt="date"
                            className='mx-3'
                            width={18}
                            height={18}
                        />
                    </div>
                    <Date
                        popupDate={popupDate}
                        setPopupDate={setPopupDate}
                        endHour={endHour}
                        setEndHour={setEndHour}
                    />

                    <Description
                        description={description}
                        setDescription={setDescription}
                    />

                    <div className="bg-light-pink flex items-center justify-center p-4">
                        <Image
                            src="/person.png"
                            alt="participants"
                            className='mx-3'
                            width={18}
                            height={18}
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
                            width={18}
                            height={18}
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
                                addEvent(title, description, setEvents, currentUser, participants, location, popupDate, endHour, setIsPopupVisible);
                            }}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}