"use client";

import { UserInterface } from "@/app/model/user";
import { useState, useEffect } from "react";
import axios from "axios";
import displayEventDetails from "@/app/event/displayEventDetails";
import { useAtom, useAtomValue } from "jotai";
import { isDetailsVisibleAtom, isPopupVisibleAtom } from "@/app/atom";
import { EventInterface } from "@/app/model/event";

interface WeeklyEventProps {
    event: EventInterface;
}

export default function WeeklyEvent({ event }: Readonly<WeeklyEventProps>) {
    const [eventCreator, setEventCreator] = useState<UserInterface>({} as UserInterface);

    const [isDetailsVisible, setIsDetailsVisible] = useAtom(isDetailsVisibleAtom);
    const isPopupVisible = useAtomValue(isPopupVisibleAtom);

    useEffect(() => {
        const fetchEventCreator = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                const users = response.data as UserInterface[];
                const eventCreator = users.find(user => user.id === +event.by);
                if (eventCreator) {
                    setEventCreator(eventCreator);
                }
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };
    
        fetchEventCreator();
    }, [event.by]);

    return (
        <button
            style={{
                backgroundColor: `${eventCreator.color}1A`,
                borderLeft: `4px solid ${eventCreator.color}`,
                color: eventCreator.color,
            }}
            onClick={(e) => {
                displayEventDetails(setIsDetailsVisible, isDetailsVisible, isPopupVisible);
            }}
            className={`rounded-l-md pl-3 text-sm py-1 hover:cursor-pointer pb-3 select-none hover:opacity-100 opacity-75 transition-all items-start justify-start flex flex-col overflow-hidden whitespace-nowrap text-ellipsis w-full h-full`}
        >
            <p>{new Date(event.beginning).getHours() + 2}:00 - {new Date(event.end).getHours() + 2}:00</p>
            <p className="font-bold">{event.title}</p>
            <p>par {eventCreator.lastName} {eventCreator.firstName}</p>
            <p>{event.location}</p>
        </button>
    )
}