"use client";

import { useEffect, useRef } from "react";
import Draggable from "../draggable/draggable";
import hideEventDetails from "@/app/event/hideEventDetails";
import { useAtomValue, useSetAtom } from "jotai";
import { currentUserAtom, eventAtom, eventsAtom, isDetailsVisibleAtom, usersAtom } from "@/app/atom";
import Location from "./location/location";
import Description from "./description/description";
import DateDetails from "./dateDetails/dateDetails";
import Title from "./title/title";
import Header from "./header/header";
import Participants from "./participants/participants";

export default function EventDetails() {
    const event = useAtomValue(eventAtom);

    const setIsDetailsVisible = useSetAtom(isDetailsVisibleAtom);

    const detailsRef = useRef<HTMLDivElement>(null);

    const users = useAtomValue(usersAtom);

    const currentUser = useAtomValue(currentUserAtom);

    const setEvents = useSetAtom(eventsAtom);

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
    }, [detailsRef.current]);

    return (
        <Draggable>
            <div
                ref={detailsRef}
                id="eventDetails"
                className="absolute text-left opacity-0 h-fit bg-white shadow-2xl transition-all duration-150 w-fit pointer-events-none text-dark-pink text-base rounded-lg"
            >
                <Header
                    event={event}
                    users={users}
                    setIsDetailsVisible={setIsDetailsVisible}
                    setEvents={setEvents}
                    currentUser={currentUser}
                />

                <div className="grid grid-cols-[auto,2fr] gap-x-6 mr-6">
                    <Title
                        event={event}
                    />

                    <DateDetails
                        event={event}
                    />

                    <Description
                        event={event}
                    />

                    <Participants
                        event={event}
                        users={users}
                    />

                    <Location
                        event={event}
                    />
                </div>
            </div>
        </Draggable>
    )
}