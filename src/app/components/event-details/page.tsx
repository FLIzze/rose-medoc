"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventInterface } from "@/app/model/event";
import deleteEvent from "@/app/event/deleteEvent";
import Draggable from "../draggable/page";
import { UserInterface } from "@/app/model/user";
import hideEventDetails from "@/app/event/hideEventDetails";
import downloadEvent from "@/app/event/downloadEvent";
import capitalizeFirstLetter from "@/app/capitalizeFirstLetter";

interface EventDetailsProps {
    event: EventInterface,
    setEvents: Dispatch<SetStateAction<EventInterface[]>>,
    pos: { x: number, y: number },
    currentUser: UserInterface,
    users: UserInterface[],
    setIsDetailsVisible: Dispatch<SetStateAction<boolean>>
}

export default function EventDetails({ 
    event, 
    setEvents, 
    pos, 
    currentUser, 
    users, 
    setIsDetailsVisible }: Readonly<EventDetailsProps>) {

    const eventBeginning = new Date(event.beginning);
    const eventEnd = new Date(event.end);

    const [size, setSize] = useState({ width: 0, height: 0 });
    const detailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (detailsRef.current) {
            const { offsetWidth, offsetHeight } = detailsRef.current;
            setSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [event.participants]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
                hideEventDetails(setIsDetailsVisible);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <Draggable pos={pos} size={size}>
            <div
                ref={detailsRef}
                id="eventDetails"
                className="absolute text-left opacity-0 h-fit bg-white shadow-2xl transition-all duration-150 w-fit pointer-events-none text-dark-pink text-base rounded-lg"
            >
                <div className="flex justify-end pr-5 h-9 w-full bg-medium-pink items-center rounded-t-lg">
                    <button onClick={() => {
                        downloadEvent(event, users);
                        hideEventDetails(setIsDetailsVisible);
                    }}>
                        <img
                            src="/download.png"
                            alt="download"
                            className="w-7 h-7 p-1 hover:bg-dark-pink rounded-full"
                        />
                    </button>
                    {event.by == currentUser.id && (
                        <button onClick={() => {
                            deleteEvent(event.id, setEvents);
                            hideEventDetails(setIsDetailsVisible);
                        }}>
                            <img
                                src="/bin.png"
                                alt="supprimer"
                                className="w-8 h-8 p-2 hover:bg-dark-pink rounded-full mx-1"
                            />
                        </button>
                    )}
                    <button onClick={() => hideEventDetails(setIsDetailsVisible)}>
                        <img
                            src="/cross.png"
                            alt="cross"
                            className="w-7 h-7 p-1 hover:bg-dark-pink rounded-full"
                        />
                    </button>
                </div>

                <div className="grid grid-cols-[auto,2fr] gap-x-6 mr-6">
                    <div className="bg-light-pink flex items-center justify-center p-2">
                        <img
                            src="title.png"
                            alt="titre"
                            className='w-5 h-5 mx-3'
                        />
                    </div>
                    <div className="pb-4 mt-4">
                        <h1 className="font-bold text-lg">{event.title}</h1>
                    </div>

                    <div className="bg-light-pink flex items-center justify-center pb-4">
                        <img
                            src="clock.png"
                            alt="date"
                            className='w-5 h-5 mx-3'
                        />
                    </div>
                    <div className="pb-4">
                        <p className="flex whitespace-nowrap">{capitalizeFirstLetter(eventBeginning.toLocaleDateString('fr-FR', { weekday: 'long' }))}, {eventBeginning.getDate()} {capitalizeFirstLetter(eventBeginning.toLocaleDateString('fr-FR', { month: 'long' }))} {eventBeginning.getHours() + 2}:00 - {eventEnd.getHours() + 2}:00</p>
                    </div>

                    {event.description && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <img
                                    src="description.png"
                                    alt="description"
                                    className='w-5 h-5 mx-3'
                                />
                            </div>
                            <div className="flex items-center pb-4 pt-2">
                                <p className="text-justify">{event.description}</p>
                            </div>
                        </>
                    )}

                    {event.participants && event.participants.length > 1 && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <img
                                    src="person.png"
                                    alt="participants"
                                    className='w-5 h-5 mx-3'
                                />
                            </div>
                            <div className="flex flex-col pb-4 pt-2">
                                <p>{event.participants.length} participants</p>
                                {event.participants.map((participantId, index) => {
                                    const participant = users.find(user => user.id === participantId);
                                    return (
                                        <p key={index}>
                                            {participant?.lastName} {participant?.firstName}
                                        </p>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {event.participants && event.participants.length == 1 && (() => {
                        const participant = users.find(user => user.id == event.participants[0]);
                        return (
                            <>
                                <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                    <img
                                        src="person.png"
                                        alt="participants"
                                        className='w-5 h-5 mx-3'
                                    />
                                </div>
                                <div className="flex items-center pb-4 pt-2">
                                    <p>{participant?.lastName} {participant?.firstName}</p>
                                </div>
                            </>
                        );
                    })()}

                    {event.location && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <img
                                    src="pin.png"
                                    alt="location"
                                    className='w-5 h-5 mx-3'
                                />
                            </div>
                            <div className="flex items-center pb-2">
                                {event.location == 'Rose Medoc' ? (
                                    <p>Rose Medoc</p>
                                ) : (
                                    <a
                                        href={`https://www.google.fr/maps/place/${event.location}`}
                                        target="blank"
                                        className="text-light-pink"
                                    >
                                        {event.location}
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Draggable>
    )
}