"use client";

import { useEffect, useRef } from "react";
import deleteEvent from "@/app/event/deleteEvent";
import Draggable from "../draggable/draggable";
import hideEventDetails from "@/app/event/hideEventDetails";
import downloadEvent from "@/app/event/downloadEvent";
import capitalizeFirstLetter from "@/app/capitalizeFirstLetter";
import Image from "next/image";
import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom, eventAtom, eventsAtom, isDetailsVisibleAtom, positionAtom, usersAtom } from "@/app/atom";

export default function EventDetails() {
    const event = useAtomValue(eventAtom);

    const eventBeginning = new Date(event.beginning);
    const eventEnd = new Date(event.end);

    const setIsDetailsVisible = useSetAtom(isDetailsVisibleAtom);

    const detailsRef = useRef<HTMLDivElement>(null);

    const pos = useAtomValue(positionAtom);

    const users = useAtomValue(usersAtom);

    const currentUser = useAtomValue(currentUserAtom);

    const setEvents = useSetAtom(eventsAtom);

    useEffect(() => {
        if (detailsRef.current) {
            const { offsetWidth, offsetHeight } = detailsRef.current;
            // setSize({ width: offsetWidth, height: offsetHeight });
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
    }, [setIsDetailsVisible]);

    return (
        <Draggable>
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
                        <Image
                            src="/download.png"
                            alt="download"
                            className="p-1 hover:bg-dark-pink rounded-full"
                            width={30}
                            height={30}
                        />
                    </button>
                    {event.by == currentUser.id && (
                        <button onClick={() => {
                            deleteEvent(event.id, setEvents);
                            hideEventDetails(setIsDetailsVisible);
                        }}>
                            <Image
                                src="/bin.png"
                                alt="supprimer"
                                className="p-2 hover:bg-dark-pink rounded-full mx-1"
                                width={30}
                                height={30}
                            />
                        </button>
                    )}
                    <button onClick={() => hideEventDetails(setIsDetailsVisible)}>
                        <Image
                            src="/cross.png"
                            alt="cross"
                            className="p-1 hover:bg-dark-pink rounded-full"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

                <div className="grid grid-cols-[auto,2fr] gap-x-6 mr-6">
                    <div className="bg-light-pink flex items-center justify-center p-2">
                        <Image
                            src="/title.png"
                            alt="titre"
                            className='mx-3'
                            width={18}
                            height={18}
                        />
                    </div>
                    <div className="pb-4 mt-4">
                        <h1 className="font-bold text-lg">{event.title}</h1>
                    </div>

                    <div className="bg-light-pink flex items-center justify-center pb-4">
                        <Image
                            src="/clock.png"
                            alt="date"
                            className='mx-3'
                            width={18}
                            height={18}
                        />
                    </div>
                    <div className="pb-4">
                        <p className="flex whitespace-nowrap">{capitalizeFirstLetter(eventBeginning.toLocaleDateString('fr-FR', { weekday: 'long' }))}, {eventBeginning.getDate()} {capitalizeFirstLetter(eventBeginning.toLocaleDateString('fr-FR', { month: 'long' }))} {eventBeginning.getHours() + 2}:00 - {eventEnd.getHours() + 2}:00</p>
                    </div>

                    {event.description && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <Image
                                    src="/description.png"
                                    alt="description"
                                    className='mx-3'
                                    height={18}
                                    width={18}
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
                                <Image
                                    src="/person.png"
                                    alt="participants"
                                    className='mx-3'
                                    width={18}
                                    height={18}
                                />
                            </div>
                            <div className="flex flex-col pb-4 pt-2">
                                <p className="font-bold">{event.participants.length} participants</p>
                                {event.participants.map((participantId, index) => {
                                    const participant = users.find(user => user.id === participantId);
                                    return (
                                        <div className="flex items-center mt-1" key={index}>
                                            <Image
                                                src={`data:image/jpeg;base64,${participant?.pp}`}
                                                alt="Profile Picture"
                                                className='rounded-full mr-2'
                                                width={25}
                                                height={25}
                                            />
                                            <p className={`${participant?.id === event.by ? 'font-bold' : ''}`}>{participant?.lastName} {participant?.firstName}</p>                                        </div>
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
                                    <Image
                                        src="/person.png"
                                        alt="participants"
                                        className='mx-3'
                                        width={18}
                                        height={18}
                                    />
                                </div>
                                <div className="flex items-center pb-4 pt-2">
                                    <div className="flex items-center mt-1">
                                        <Image
                                            src={`data:image/jpeg;base64,${participant?.pp}`}
                                            alt="Profile Picture"
                                            className='w-6 h-6 rounded-full mr-2'
                                            width={20}
                                            height={20}
                                        />
                                        <p className="font-bold">{participant?.lastName} {participant?.firstName}</p>
                                    </div>
                                </div>
                            </>
                        );
                    })()}

                    {event.location && (
                        <>
                            <div className="bg-light-pink flex items-center justify-center p-2 pb-4">
                                <Image
                                    src="/pin.png"
                                    alt="location"
                                    className='mx-3'
                                    height={18}
                                    width={18}
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